import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SearchParams, Itinerary } from "@/store/types";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_AI_KEY;

// Define the response schema for strict JSON output
const activitySchema: Schema = {
	type: Type.OBJECT,
	properties: {
		time: {
			type: Type.STRING,
			description: "Time of day (e.g., 09:00 AM)",
		},
		title: {
			type: Type.STRING,
			description: "Name of the place or activity",
		},
		description: {
			type: Type.STRING,
			description: "Brief description of what to do there",
		},
		type: {
			type: Type.STRING,
			enum: ["activity", "meal", "transit", "rest"],
		},
		location: {
			type: Type.STRING,
			description: "Location name or address",
		},
		ecoTip: {
			type: Type.STRING,
			description:
				"A specific eco-friendly tip for this activity (e.g. bring reusable bottle, respect silence)",
		},
		durationHint: {
			type: Type.STRING,
			description: "Estimated duration (e.g. 2 hours)",
		},
	},
	required: ["time", "title", "type", "description"],
};

const daySchema: Schema = {
	type: Type.OBJECT,
	properties: {
		dayNumber: { type: Type.INTEGER },
		theme: {
			type: Type.STRING,
			description: "Main theme of the day (e.g., Historic Center)",
		},
		activities: { type: Type.ARRAY, items: activitySchema },
	},
	required: ["dayNumber", "theme", "activities"],
};

const itinerarySchema: Schema = {
	type: Type.OBJECT,
	properties: {
		title: {
			type: Type.STRING,
			description: "A catchy title for the trip",
		},
		summary: {
			type: Type.STRING,
			description: "A 2-sentence summary of the trip vibe",
		},
		days: { type: Type.ARRAY, items: daySchema },
		localEtiquette: {
			type: Type.ARRAY,
			items: { type: Type.STRING },
			description:
				"List max. 3 important local cultural etiquette rules or taboos.",
		},
		seasonalEvents: {
			type: Type.ARRAY,
			items: { type: Type.STRING },
			description:
				"List of 1-2 generic seasonal highlights typical for this destination.",
		},
	},
	required: ["title", "summary", "days", "localEtiquette"],
};

const generateItinerary = async (params: SearchParams): Promise<Itinerary> => {
	if (!apiKey) {
		throw new Error("API Key is missing");
	}

	const ai = new GoogleGenAI({ apiKey });

	// Calculate duration in days
	const start = new Date(params.startDate);
	const end = new Date(params.endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	const durationInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

	const prompt = `
    Create a detailed ${durationInDays}-day travel itinerary for a trip to ${params.city}, starting from ${params.originCity}.
    Dates: ${params.startDate} to ${params.endDate}.
    Group Size: ${params.peopleCount} people.
    
    Preferences:
    - Pace: ${params.pace}
    - Mood/Style: ${params.mood}
    - Daily Schedule: Start activities around ${params.startTime} and end around ${params.endTime}.
    
    Requirements:
    1. Arrival/Departure: On Day 1, consider travel time from ${params.originCity} (approximate).
    2. Smart Time Blocking: Ensure realistic travel times between places given the city traffic and group size.
    3. Sustainable Tourism: Emphasize eco-friendly spots, walking tours, public transport, and local businesses (SDG 11).
    4. Include "Eco Tips" for activities where relevant (e.g., "Use public transport here", "No flash photography").
    5. Adjust to the user ${params.describe}
    6. Provide strictly structured JSON.
  `;

	try {
		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				responseMimeType: "application/json",
				responseSchema: itinerarySchema,
				temperature: 0.7,
			},
		});

		const text = response.text;
		if (!text) throw new Error("No data received from AI");

		const data = JSON.parse(text);

		// Add client-side fields
		return {
			...data,
			id: crypto.randomUUID(),
			destination: params.city,
			createdAt: Date.now(),
		};
	} catch (error) {
		console.error("Gemini Generation Error:", error);
		throw new Error("Failed to generate itinerary. Please try again.");
	}
};

export async function POST(request: NextRequest) {
	try {
		const params: SearchParams = await request.json();
		const itinerary = await generateItinerary(params);
		return NextResponse.json(itinerary);
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to generate itinerary",
			},
			{ status: 500 }
		);
	}
}
