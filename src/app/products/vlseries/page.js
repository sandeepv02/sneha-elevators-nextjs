import ProductSeriesTemplate from "@/components/ProductSeriesTemplate";

export const metadata = {
  title: "VL SERIES Home Lifts Manufacturers, Suppliers in Hyderabad | Sneha Elev8r",
  description: "VL Series (Machine Room Less Lift Manufacturers & suppliers in Hyderabad, India) - Sneha elevator is One of the Top leading company MRL Lift services in India.",
};

const vlFeatures = [
  {
    icon: "/img/product-icon-1.png",
    title: "Smooth & quiet ride",
    description: "Smooth acceleration & deceleration with precise floor levelling, ensuring a comfortable ride."
  },
  {
    icon: "/img/product-icon-2.png",
    title: "Energy-efficient drive system",
    description: "The advanced gearless elevator machine in the VL series consumes less power, requires lower starting current, and operates without oil, making it cost-effective & eco-friendly."
  },
  {
    icon: "/img/product-icon-3.png",
    title: "Cost Effective Solutions",
    description: "Customised fitting, making the design efficient, reducing extra civil work."
  },
  {
    icon: "/img/product-icon-4.png",
    title: "Refined cabin experience",
    description: "Aesthetically designed cabins with LED lighting."
  },
  {
    centerImage: "/img/vl-series-block.png"
  }
];

const vlSpecifications = [
  { title: "Capacity", value: "4 - 30 Pax (272-2040kg)" },
  { title: "Speed", value: "0.5 m/sec to 2.5 m/sec" },
  { title: "Pit", value: "1000 mm - 2500 mm" },
  { title: "Overhead", value: "3000 mm - 6000 mm" },
  { title: "No. of Stops", value: "2-25 stops" }
];

const vlSpaces = [
  { image: "/img/vl-High-rise-building.png", title: "High-rise building" },
  { image: "/img/vl-Boutique.jpeg", title: "Commercial Complexes" },
  { image: "/img/vl-Office.jpeg", title: "Office" },
  { image: "/img/vl-upscale-homes.jpeg", title:"Residential" }
];

const vlPersonalisationhead = [
  "With the VL Series, you don't just choose an elevator, you shape it. Pick from a range of cabin materials, textures, lighting styles and panel finishes to match your space. Built as a machine roomless (MRL) lift, the VL Series fits cleanly into your building and gives you a dependable, energy efficient ride."
];

const vlPersonalisation = [
  { image: "/img/glasscabin.png", },
  { image: "/img/stainlesssteel.png",  },
  { image: "/img/designerrosegold.png", }
];

const vlPersonalisationDuplicate = [
  { image: "/img/doortype-1.jpeg" },
  { image: "/img/doortype-2.jpeg" },
  { image: "/img/doortype-3.jpeg" }
];

const vlPortraitSpaces = [
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
const vlPersonalisationheadDuplicate = [
  "Choose from door types and premium finishes that create elegance in every entry."
];

const doorTypesGallery = [
  { image: "/img/doortype-1.jpeg" },
  { image: "/img/doortype-2.jpeg" }
];

const vlSafetyFeatures = [
  {
    icon: "/img/overload-icon.png",
    title: "Emergency Alarm System",
    description: "1-hour fire-rated doors for fire protection."
  },
  {
    icon: "/img/sensor-icon.png",
    title: "Sensor Based Doors",
    description: "Automatic doors with light curtains for added safety."
  },
  {
    icon: "/img/emergency-icon.png",
    title: "Automatic Rescue Device",
    description: "Automatic rescue device for user safety in case of a power outage."
  }
];

export default function VLSeriesPage() {
  return (
    <ProductSeriesTemplate
      seriesName="VL SERIES"
      heroImage="/img/vl-series-home-banner.png"
      heroSubheading="Machine Room Less"
      heroParagraph="Perfect for upscale homes, boutique offices, and low to high-rise buildings."
      highlightsDescription="The VL Series is designed for low to highrise residential and commercial buildings where space, comfort and energy efficiency matter. As a machine roomless (MRL) lift, it removes the need for a separate machine room, reduces civil work and uses floor space efficiently."
      features={vlFeatures}
      specifications={vlSpecifications}
      spaces={vlSpaces}
      portraitSpaces={vlPortraitSpaces}
      personalisationChoices={vlPersonalisation}
      personalisationChoicesDuplicate={vlPersonalisationDuplicate}
      personalisationHead={vlPersonalisationhead}
      personalisationHeadDuplicate={vlPersonalisationheadDuplicate}
      doorTypesGallery={doorTypesGallery}
      safetyIntroText="With its compact design, energy-conscious functioning, and trustworthy performance, the VL Series stands out as a dependable machine room with gearless drive elevator solution engineered for long-term value."
      safetyFeatures={vlSafetyFeatures}
    />
  );
}
