import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Elevator Maintenance, Upgrades & AMC Services | Sneha Elev8r",
  description: "Get dependable vertical mobility with Sneha Elev8r. We offer 24/7 elevator maintenance, genuine spare parts replacement, responsive repair services, and tailored Annual Maintenance Contracts (AMC) in South India.",
  alternates: {
    canonical: "https://snehaelev8r.com/services",
  },
};

export default function Page() {
  return <ServicesClient />;
}
