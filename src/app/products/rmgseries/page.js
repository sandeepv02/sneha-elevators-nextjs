import ProductSeriesTemplate from "@/components/ProductSeriesTemplate";

export const metadata = {
  title: "Machine Room Home Elevator Suppliers in Hyderabad, India | RMG Series | Sneha Elev8r",
  description: "Sneha Elevator is one of the best Home Lifts Manufacturers, Suppliers & Dealers in India. Sneha elev8r offers the best lift service at an affordable price.",
};

const rmgFeatures = [
  {
    icon: "/img/product-icon-1.png",
    title: "Smooth & quiet ride",
    description: "Advanced traction technology ensures silent, jerk-free travel every time."
  },
  {
    icon: "/img/product-icon-2.png",
    title: "Durable & low maintenance",
    description: "Engineered to reduce wear and tear, minimizing downtime and service needs."
  },
  {
    icon: "/img/product-icon-3.png",
    title: "Cost Effective Solutions",
    description: "An economical elevator choice offering long-term savings on operation and spares."
  },
  {
    icon: "/img/product-icon-4.png",
    title: "Safety Compliant",
    description: "Built with essential safety systems that meet industry standards for daily use."
  },
  {
    centerImage: "/img/rm-series-block.png"
  }
];

const rmgSpecifications = [
  { title: "Capacity", value: "4 - 30 Pax (272-2040kg)" },
  { title: "Speed", value: "0.63 m/sec to 2.5 m/sec" },
  { title: "PIT", value: "1000 mm" },
  { title: "Overhead", value: "3900 mm" },
  { title: "No. Of Stops", value: "25 stops" }
];

const rmgSpaces = [
  { image: "/img/rmg-Low-to-high.png", title: "Low to high rise building" },
  { image: "/img/rmg-Residential.png", title: "Residential" },
  { image: "/img/rmg-Commercial-spaces.png", title: "Commercial Spaces" }
];

const rmgPersonalisation = [
  { image: "/img/stainless.png", title: "Stainless steel or mild steel (MS) cabin finishes" },
  { image: "/img/automatic.png", title: "Convert manual lifts to auto lifts." },
  { image: "/img/funtional.png", title: "Functional and aesthetic lighting options" }
];

const rmgSafetyFeatures = [
  {
    icon: "/img/sensor-icon.png",
    title: "Sensor Based Doors",
    description: "Prevents door closure when an obstruction is detected, ensuringsafe entry and exit."
  },
  {
    icon: "/img/emergency-icon.png",
    title: "Automatic Rescue Device",
    description: "Safely moves the elevator to the nearest floor and opens doors during power failure."
  },
  {
    icon: "/img/overload-icon.png",
    title: "Emergency Alarm System",
    description: "Allows passengers to alert for assistance in case of an emergency."
  },
  {
    icon: "/img/power-failure-safety.png",
    title: "Overload Protection",
    description: "Prevents elevator operation when load limits are exceeded, enhancing safety."
  },
  {
    icon: "/img/automatic-icon.png",
    title: "Power Failure Safety",
    description: "Ensures controlled operation and passenger safety during electrical interruptions."
  }
];

export default function RMGSeriesPage() {
  return (
    <ProductSeriesTemplate
      seriesName="RMG SERIES"
      heroImage="/img/Rm-series-hero.png"
      highlightsTitle="Smooth Performance Meets Long-term Savings"
      highlightsDescription="The RMG Series caters to low to medium-rise buildings, where efficiency and long-term value are essential. It features a machine room with gearless drive elevator that combines traction technology with modern control systems for a smooth experience. One of the top choices for projects in South India, the RMG Series is a trusted choice for Room machine gearless elevators in Hyderabad projects where performance and economy go hand in hand. It is equally suitable for projects seeking a machine room with gearless drive in Bangalore, delivering consistent operation even under demanding usage conditions. The RMG Series is ideal for homeowners, builders, and developers looking for a machine room with gearless drive elevator that balances cost efficiency with dependable performance. Its adaptability has made it a reliable option for both machine room with gearless drive in Hyderabad and machine room with gearless drive elevator in Bangalore developments alike."
      features={rmgFeatures}
      specifications={rmgSpecifications}
      spaces={rmgSpaces}
      personalisationChoices={rmgPersonalisation}
      safetyIntroText=""
      safetyFeatures={rmgSafetyFeatures}
    />
  );
}
