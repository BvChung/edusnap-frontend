"use client";

import React from "react";
import SideBar from "@/components/sideBar/SideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex">
			<SideBar />
			<div className="flex-1">{children}</div>
		</div>
	);
}
