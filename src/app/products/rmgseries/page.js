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
  { title: "PIT", value: "1000 mm - 2500 mm" },
  { title: "Overhead", value: "3900 mm - 6000 mm" },
  { title: "No. Of Stops", value: "25 stops" }
];

const rmgSpaces = [
  { image: "/img/rmg-Low-to-high.png", title: "Low to high rise building" },
  { image: "/img/rmg-Residential.png", title: "Residential" },
  { image: "/img/rmg-Commercial-spaces.png", title: "Commercial Spaces" }
];

const rmgPersonalisationhead = [
  "With the RMG Series, you don't just choose an elevator, you shape it. Select from a range of cabin materials, textures, lighting styles, and panel finishes to match your space perfectly. We work closely with you to ensure your machine room with gearless drive elevator blends beautifully with your building while delivering dependable performance."
];



const rmgPersonalisation = [
  { image: "/img/glasscabin.png", },
  { image: "/img/stainlesssteel.png",  },
  { image: "/img/designerrosegold.png", }
];

const rmgPersonalisationDuplicate = [
  { image: "/img/doortype-1.jpeg" },
  { image: "/img/doortype-2.jpeg" },
  { image: "/img/doortype-3.jpeg" }
];
const rmgPortraitSpaces = [
  { image: "/img/colors_Black Hairline.jpg", title: "Black Hairline" },
  { image: "/img/colors_Black Mirror.jpg", title: "Black Mirror" },
  { image: "/img/colors_Bronze Hairline.jpg", title: "Bronze Hairline" },
  { image: "/img/colors_Bronze Mirror.jpg", title: "Bronze Mirror" },
  { image: "/img/colors_Champagne Hairline.jpg", title: "Champagne Hairline" },
  { image: "/img/colors_Gold Hairline.jpg", title: "Gold Hairline" },
  { image: "/img/colors_Gold Linen.jpg", title: "Gold Linen" },
  { image: "/img/colors_Gold Mirror.jpg", title: "Gold Mirror" },
  { image: "/img/colors_Gold Sand Blast.jpg", title: "Gold Sand Blast" },
  { image: "/img/colors_Rose Gold Hairline.jpeg", title: "Rose Gold Hairline" },
  { image: "/img/colors_Rose Gold Sand Blast.jpg", title: "Rose Gold Sand Blast" },
  { image: "/img/colors_Silver Hairline.jpg", title: "colors_Silver Hairline" },
  { image: "/img/colors_Silver Leather Finish.jpg", title: "Silver Leather Finish" },
  { image: "/img/colors_Silver Linen.jpg", title: "Silver Linen" },
  
];
const rmgPersonalisationheadDuplicate = [
  "Choose from door types and premium finishes that create elegance in every entry."
];

const doorTypesGallery = [
  { image: "/img/lop.png" },
  { image: "/img/cop.png" }
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
      heroSubheading="Machine Room Less"
      heroParagraph="Ideal for low to high-rise buildings,economical,residential and commercial spaces."
      highlightsTitle="Performance Meets Efficiency"
      highlightsDescription="The RMG Series is designed for low to high rise buildings where long-term value matters. Featuring a gearless traction drive, it delivers smooth, quiet travel with minimal operating costs. Engineered for reliable performance under regular daily use, it is a trusted choice for homeowners, builders, and developers."
      features={rmgFeatures}
      specifications={rmgSpecifications}
      spaces={rmgSpaces}
      portraitSpaces={rmgPortraitSpaces}
      personalisationHead={rmgPersonalisationhead}
      personalisationChoices={rmgPersonalisation}
      personalisationChoicesDuplicate={rmgPersonalisationDuplicate}
      personalisationHeadDuplicate={rmgPersonalisationheadDuplicate}
      doorTypesGallery={doorTypesGallery}
      safetyIntroText=""
      safetyFeatures={rmgSafetyFeatures}
    />
  );
}
