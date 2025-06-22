/**
 * 🎁 Benefits Section (Card Tile Layout)
● Show tiles or cards for benefits (e.g., discounts, offers, vouchers).
● Each tile should have a title, icon, description, and CTA (like "Claim" or "View").
 */

import { Button } from "@/components/ui/button";

const benefitsData = [
	{
		title: "Exclusive Discounts",
		icon: "https://api.dicebear.com/7.x/icons/svg?seed=discount&backgroundColor=4F46E5",
		description: "Get up to 50% off on selected items.",
		cta: "Claim",
	},
	{
		title: "Free Vouchers",
		icon: "https://api.dicebear.com/7.x/icons/svg?seed=voucher&backgroundColor=4F46E5",
		description: "Receive vouchers for your next purchase.",
		cta: "View",
	},
	{
		title: "Early Access",
		icon: "https://api.dicebear.com/7.x/icons/svg?seed=earlyAccess&backgroundColor=4F46E5",
		description: "Be the first to try new features and products.",
		cta: "View",
	},
	{
		title: "Loyalty Points",
		icon: "https://api.dicebear.com/7.x/icons/svg?seed=loyalty&backgroundColor=4F46E5",
		description: "Earn points with every purchase and redeem them for rewards.",
		cta: "View",
	},
	{
		title: "Referral Bonuses",
		icon: "https://api.dicebear.com/7.x/icons/svg?seed=referral&backgroundColor=4F46E5",
		description: "Refer friends and earn bonuses for each successful referral.",
		cta: "Claim",
	},
	{
		title: "Exclusive Content",
		icon: "https://api.dicebear.com/7.x/icons/svg?seed=content&backgroundColor=4F46E5",
		description: "Access premium content available only to members.",
		cta: "Claim",
	},
];

export function Benefits() {
	return (
		<section className="benefits-section">
			<h1 className="text-xl sm:text-2xl lg:text-3xl leading-none font-semibold mb-4 sm:mb-6">Benefits</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
				{/* The icon should be large and take the first half of the card, then below it the title, description, and CTA button. */}
				{benefitsData.map((benefit, index) => (
					<div
						key={index}
						className="bg-card text-card-foreground shadow-lg hover:shadow-xl rounded-xl p-4 sm:p-6 flex flex-col items-center transition-all duration-200 h-full hover:scale-105"
					>
						<div className="flex-1 flex flex-col items-center text-center">
							<img
								src={benefit.icon}
								alt={benefit.title}
								className="rounded-lg w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4"
							/>
							<h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">
								{benefit.title}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
								{benefit.description}
							</p>
						</div>
						<Button
							variant={benefit.cta === "Claim" ? "default" : "outline"}
							className="w-full sm:w-auto min-w-[100px] cursor-pointer rounded-lg transition-colors text-sm sm:text-base"
							size="default"
						>
							{benefit.cta}
						</Button>
					</div>
				))}
			</div>
		</section>
	);
}