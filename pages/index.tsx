import DefaultLayout from "@/layouts/default";
import FAQ from "@/components/LandingPage/FAQ";
import WhyToApply from "@/components/LandingPage/sections/whytoapply";
import MainBanner from "@/components/LandingPage/sections/main_banner";
import CustomerLogo from "@/components/LandingPage/sections/customer_logo";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section id="main_banner">
				<MainBanner></MainBanner>
			</section>
			<section id="whytoapply">
				<WhyToApply></WhyToApply>
			</section>
			<section id="customer_logo">
				<CustomerLogo></CustomerLogo>
			</section>
			<section id="faq">
				<FAQ></FAQ>
			</section>
		</DefaultLayout >
	);
}
