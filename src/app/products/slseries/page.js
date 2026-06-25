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
 
];

const slSpaces = [
  { image: "/img/sl-villas.png", title: "Villas" },
  { image: "/img/sl-Duplexes.png", title: "Duplexes" },
  { image: "/img/sl-clinics.png", title: "Clinics" }
];

const slCategories = [
  { image: "/img/sl-villas.png", title: "Villas" },
  { image: "/img/sl-Duplexes.png", title: "Duplexes" },
  { image: "/img/sl-clinics.png", title: "Clinics" },
  { image: "/img/sl-Retrofits.png", title: "Retrofits" },
  { image: "/img/vl-Office.jpeg", title: "Offices" },
  { image: "/img/vl-Boutique.jpeg", title: "Boutiques" },
  { image: "/img/vl-upscale-homes.jpeg", title: "Upscale Homes" },
  { image: "/img/urbanx.png", title: "Urban Spaces" }
];

const slPersonalisationhead = [
  "With the SL Series, you don't just choose an elevator, you shape it. Choose cabin materials, textures, lighting and panel finishes to suit your home. Engineered as a Home/Villas lift, the SL Series installs without a separate machine room, even in existing structures."
]

const slPersonalisation = [
  { image: "/img/glasscabin.jpeg" },
  { image: "/img/stainlesssteel.png" },
  { image: "/img/designerrosegold.png" }
];
const slPersonalisationDuplicate = [
  { image: "/img/doortype-1.jpeg" },
  { image: "/img/doortype-2.jpeg" },
  { image: "/img/doortype-3.jpeg" }
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
      highlightsDescription="The SL Series is built for Home / Villlas and existing structures where space is limited. As a machine roomless (MRL) & Pitless lift, it installs without a separate machine room, with the motor housed inside the hoistway. It runs on single-phase power, uses around 30% less energy than conventional systems."
      features={slFeatures}
      specifications={slSpecifications}
      spaces={slSpaces}
      personalisationChoices={slPersonalisation}
      personalisationChoicesDuplicate={slPersonalisationDuplicate}
      categories={slCategories}
      personalisationHead={slPersonalisationhead}
      safetyIntroText=""
      safetyFeatures={slSafetyFeatures}
    />
  );
}
