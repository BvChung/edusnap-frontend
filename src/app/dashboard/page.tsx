"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

type Message = {
	id: string;
	message: string;
	encoded_image: string;
};

export default function Page() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Message[]>([]);
	const [image, setImage] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const message = formData.get("message") as string;

		const id = "d7e2d1e3-30ed-4332-b26c-45314f33bad3";

		const newMessage: Message = {
			id: id,
			message,
			encoded_image: image as string,
		};

		try {
			const res = await fetch("http://localhost:8080/api/message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newMessage),
			});

			if (res.ok) {
				toast.success("Message Sent");
				console.log(res.json());
			}
		} catch (error) {
			toast.error("Error sending message");
			return;
		}
	}

	// console.log(image);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = function () {
			setImage(reader.result as string);
		};

		reader.readAsDataURL(file);
	};

	return (
		<div className="p-12 flex flex-col">
			<h1 className="text-secondaryText font-semibold text-4xl">
				Welcome Back, Get to Practice
			</h1>
			<h1 className="text-3xl font-semibold text-neutral-100 mb-8">
				Upload Image
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-7 mb-10">
					<div className="max-w-3xl">
						<label
							htmlFor=""
							className="block text-sm font-medium leading-6 text-neutral-300"
						>
							Image
						</label>

						<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
							<div className="text-center">
								<PhotoIcon
									className="mx-auto h-12 w-12 text-gray-300"
									aria-hidden="true"
								/>
								<div className="mt-4 mb-2 flex items-center justify-center text-sm leading-6 text-gray-600">
									<label
										htmlFor="audio-file"
										className="relative cursor-pointer rounded-md bg-inputBG px-6 py-5 font-semibold text-secondaryText "
									>
										<span className="">Upload a file</span>
										<input
											type="file"
											name="image-file"
											id="image-file"
											accept=".jpg,.jpeg,.png"
											onChange={handleImageUpload}
											className="mt-2 cursor-pointer block w-full text-sm text-secondaryText
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-inputBorder file:text-neutral-200
                file:cursor-pointer "
										/>
									</label>
								</div>
								<p className="text-xs leading-5 text-gray-400">
									PNG, JPG, JPEG up to 10MB
								</p>
							</div>
						</div>
						{image && (
							<Image
								src={image}
								width={0}
								height={0}
								className="w-full h-auto object-scale-down rounded-md mx-auto"
								alt="Uploaded"
							/>
						)}
					</div>
				</div>

				<div className="max-w-3xl">
					<label
						htmlFor="message"
						className="block text-sm font-medium leading-6 text-neutral-300"
					>
						Message
					</label>
					<div className="mt-2">
						<textarea
							id="message"
							name="message"
							rows={3}
							className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
							defaultValue={""}
							placeholder="Send a message..."
						/>
					</div>
				</div>

				<div className="mt-8 flex items-center justify-end max-w-3xl">
					<button
						type="submit"
						disabled={isLoading}
						className="py-2 px-4 flex rounded-md no-underline disabled:bg-gray-700 disabled:bg-opacity-25 disabled:cursor-not-allowed bg-mainButton hover:bg-mainButtonHover text-sm font-medium"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
}
