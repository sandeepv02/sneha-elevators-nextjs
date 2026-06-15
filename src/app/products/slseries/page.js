import ProductSeriesTemplate from "@/components/ProductSeriesTemplate";

export const metadata = {
  title: "SL Series villas and home lift services in Hyderabad | Sneha Elev8r",
  description: "SL Series - This Machine Room Less (MRL) elevator is specially developed by Sneha for villas and existing homes with place constraints. Contact us to get the best deals.",
};

const slFeatures = [
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
    centerImage: "/img/sl-series-block.png"
  }
];

const slSpecifications = [
  { title: "Capacity", value: "Up to 4 Persons (68-272kg)" },
  { title: "Speed", value: "0.5 m/sec" },
  { title: "PIT", value: "Min 150 mm" },
  { title: "Overhead", value: "Min 2800 mm" },
  { title: "No. Of Stops", value: "4 stops" }
];

const slSpaces = [
  { image: "/img/sl-villas.png", title: "Villas" },
  { image: "/img/sl-Duplexes.png", title: "Duplexes" },
  { image: "/img/sl-Retrofits.png", title: "Retrofits" },
  { image: "/img/sl-clinics.png", title: "Clinics" }
];

const slPersonalisation = [
  { image: "/img/stainless.png", title: "Stainless steel or mild steel (MS) cabin finishes" },
  { image: "/img/automatic.png", title: "Convert manual lifts to automatic lifts." },
  { image: "/img/funtional.png", title: "Functional and aesthetic lighting options" }
];

const slSafetyFeatures = [
  {
    icon: "/img/sensor-icon.png",
    title: "Sensor Based Doors",
    description: "Prevents door closure when an obstruction is detected, ensuring safe entry and exit."
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
    title: "Automatic glass door",
    description: "Enhances the aesthetics & architectural appeal of the villa or the structure."
  }
];

export default function SLSeriesPage() {
  return (
    <ProductSeriesTemplate
      seriesName="SL SERIES"
      heroImage="/img/Sl-series-hero.png"
      highlightsTitle="Elegance meets comfort for modern living"
      highlightsDescription="SL Series is exclusively developed for villas and existing structures with space constraints. Designed as one of the best residential elevators, the SL Series combines compact construction with efficient performance. Engineered as a machine room less elevator, the SL Series doesn't need a space room, and its motor is installed within the hoistway, either at the bottom or at the top of the shaft. This gives the flexibility to fit these elevators in existing structures, including pitless residential elevator applications. SL Series is highly energy efficient as it consumes nearly 30% less power compared to traditional systems. It operates on a single-phase power supply and requires minimal maintenance, making it an economic and ecological choice for homeowners. It can be installed outdoors or indoors using an MS structure, which gives it an advantage for projects seeking a villa home lift in Hyderabad."
      features={slFeatures}
      specifications={slSpecifications}
      spaces={slSpaces}
      personalisationChoices={slPersonalisation}
      safetyIntroText=""
      safetyFeatures={slSafetyFeatures}
    />
  );
}
