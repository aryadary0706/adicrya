"use client";

import React, { useEffect, useState } from "react";
import { ActivityCard } from "../components/ScheduleCard";
import { useItineraryStore } from "@/store/ItinerarySystem";
import {
	Loader2,
	Save,
	ArrowLeft,
	Leaf,
	Info,
	Calendar,
	MoveUp,
	MoveDown,
	Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
	const {
		searchParams,
		currentItinerary,
		setCurrentItinerary,
		saveItinerary,
	} = useItineraryStore();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (currentItinerary) return;

		if (searchParams) {
			const fetchData = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await fetch("/api/generateItinerary", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(searchParams),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(
							errorData.error || "Failed to generate itinerary"
						);
					}

					const result = await response.json();
					setCurrentItinerary(result);
				} catch (err) {
					setError(
						err instanceof Error
							? err.message
							: "An unknown error occurred"
					);
				} finally {
					setLoading(false);
				}
			};
			fetchData();
		} else {
			// No params, redirect to home
			router.push("/plan");
		}
	}, [searchParams, currentItinerary, setCurrentItinerary, router]);

	const handleSave = () => {
		if (currentItinerary) {
			saveItinerary(currentItinerary);
			router.push("/saved");
		}
	};

	// Simple Drag & Drop Simulation (Swap Logic)
	const moveActivity = (
		dayIndex: number,
		activityIndex: number,
		direction: "up" | "down"
	) => {
		if (!currentItinerary) return;

		const newItinerary = { ...currentItinerary };
		const day = { ...newItinerary.days[dayIndex] };
		const activities = [...day.activities];

		const swapIndex =
			direction === "up" ? activityIndex - 1 : activityIndex + 1;

		if (swapIndex >= 0 && swapIndex < activities.length) {
			[activities[activityIndex], activities[swapIndex]] = [
				activities[swapIndex],
				activities[activityIndex],
			];
			day.activities = activities;
			newItinerary.days[dayIndex] = day;
			setCurrentItinerary(newItinerary);
		}
	};

	const deleteActivity = (dayIndex: number, activityIndex: number) => {
		if (!currentItinerary) return;
		const newItinerary = { ...currentItinerary };
		const day = { ...newItinerary.days[dayIndex] };
		day.activities = day.activities.filter(
			(_, idx) => idx !== activityIndex
		);
		newItinerary.days[dayIndex] = day;
		setCurrentItinerary(newItinerary);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
				<Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
				<h2 className="text-xl font-semibold text-slate-800">
					Generating your eco-friendly trip...
				</h2>
				<p className="text-slate-500 mt-2 text-center max-w-md">
					Our AI is finding the best sustainable spots, calculating
					routes, and organizing your schedule.
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
				<div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md text-center border border-red-100">
					<h2 className="text-lg font-bold mb-2">
						Oops! Something went wrong.
					</h2>
					<p>{error}</p>
					<button
						onClick={() => router.push("/plan")}
						className="mt-4 bg-white border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (!currentItinerary) return null;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<button
					onClick={() => router.push("/plan")}
					className="flex items-center text-slate-500 hover:text-emerald-600"
				>
					<ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
				</button>
				<button
					onClick={handleSave}
					className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition shadow-sm font-medium"
				>
					<Save className="w-4 h-4" /> Save Itinerary
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:grid-rows-[auto]">
				{/* Main Timeline */}
				<div className="lg:col-span-2 space-y-10">
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
						<h1 className="text-3xl font-bold text-slate-900">
							{currentItinerary.title}
						</h1>
						<p className="text-slate-600 mt-2">
							{currentItinerary.summary}
						</p>
						<div className="flex flex-wrap gap-2 mt-4">
							{currentItinerary.seasonalEvents.map((event, i) => (
								<span
									key={i}
									className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
								>
									<Calendar className="w-3 h-3 mr-1" />{" "}
									{event}
								</span>
							))}
						</div>
					</div>

					{currentItinerary.days.map((day, dayIndex) => (
						<div
							key={dayIndex}
							className="relative border-l-2 border-emerald-200 pl-8 pb-4"
						>
							<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
							<h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
								Day {day.dayNumber}:{" "}
								<span className="font-normal text-slate-600 ml-2">
									{day.theme}
								</span>
							</h2>

							<div className="space-y-4">
								{day.activities.map((activity, actIndex) => (
									<ActivityCard
										key={actIndex}
										activity={activity}
										onUp={() =>
											moveActivity(
												dayIndex,
												actIndex,
												"up"
											)
										}
										onDown={() =>
											moveActivity(
												dayIndex,
												actIndex,
												"down"
											)
										}
										onDelete={() =>
											deleteActivity(dayIndex, actIndex)
										}
										isFirst={actIndex === 0}
										isLast={
											actIndex ===
											day.activities.length - 1
										}
									/>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Sidebar Info */}
				<div className="space-y-6 sticky top-20 h-fit">
					{/* Local Etiquette */}
					<div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 ">
						<div className="flex items-center gap-2 mb-4">
							<Info className="w-5 h-5 text-emerald-700" />
							<h3 className="font-bold text-emerald-900">
								Local Etiquette Guide
							</h3>
						</div>
						<ul className="space-y-3">
							{currentItinerary.localEtiquette.map((rule, i) => (
								<li
									key={i}
									className="flex items-start text-sm text-emerald-800"
								>
									<span className="mr-2">•</span> {rule}
								</li>
							))}
						</ul>
					</div>

					{/* Summary Stats */}
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
						<h3 className="font-bold text-slate-900 mb-4">
							Trip Overview
						</h3>
						<div className="space-y-3 text-sm text-slate-600">
							<div className="flex justify-between">
								<span>Duration</span>
								<span className="font-medium">
									{currentItinerary.days.length} Days
								</span>
							</div>
							<div className="flex justify-between">
								<span>Destination</span>
								<span className="font-medium">
									{currentItinerary.destination}
								</span>
							</div>
							<div className="flex justify-between">
								<span>Focus</span>
								<span className="font-medium text-emerald-600">
									Sustainable Travel
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
