import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  id: number;
  title: string;
  icon: string;
  description: string;
  cta: string;
  category: string;
}

export function Benefits() {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const benefitItemsRef = useRef<(HTMLDivElement | null)[]>([]);
	
	const [benefitsData, setBenefitsData] = useState<Benefit[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBenefitsData = async () => {
			try {
				const response = await fetch('/api/benefits');
				if (!response.ok) throw new Error('Failed to fetch benefits data');
				const data = await response.json();
				setBenefitsData(data);
			} catch (error) {
				console.error('Error fetching benefits data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBenefitsData();
	}, []);
	useEffect(() => {
		if (!benefitsData.length) return;
		
		const ctx = gsap.context(() => {
			gsap.set([titleRef.current, benefitItemsRef.current], {
				opacity: 0,
				y: 30
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "bottom 20%",
					toggleActions: "play none none reverse"
				}
			});

			tl.to(titleRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power2.out"
			})
			.to(benefitItemsRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.1
			}, "-=0.3");

		}, sectionRef);

		return () => ctx.revert();
	}, [benefitsData]);

	if (loading) {
		return (
			<section className="benefits-section">
				<div className="h-8 bg-muted rounded w-32 mb-6 animate-pulse"></div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="bg-card rounded-xl p-6 shadow-lg animate-pulse">
							<div className="w-20 h-20 bg-muted rounded-lg mb-4 mx-auto"></div>
							<div className="h-6 bg-muted rounded mb-3"></div>
							<div className="space-y-2 mb-6">
								<div className="h-4 bg-muted rounded"></div>
								<div className="h-4 bg-muted rounded w-3/4"></div>
							</div>
							<div className="h-10 bg-muted rounded"></div>
						</div>
					))}
				</div>
			</section>
		);
	}

	if (!benefitsData.length) {
		return (
			<section className="benefits-section">
				<h1 className="text-xl sm:text-2xl lg:text-3xl leading-none font-semibold mb-4 sm:mb-6">Benefits</h1>
				<div className="text-center text-muted-foreground">
					Failed to load benefits data
				</div>
			</section>
		);
	}

	return (
		<section ref={sectionRef} className="benefits-section">
			<h1 ref={titleRef} className="text-xl sm:text-2xl lg:text-3xl leading-none font-semibold mb-4 sm:mb-6">Benefits</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
				{benefitsData.map((benefit, index) => (
					<div
						key={benefit.id}
						ref={el => { benefitItemsRef.current[index] = el; }}
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