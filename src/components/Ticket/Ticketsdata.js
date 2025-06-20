import ticket1 from "../../Assets/ticket1.jpg";
import ticket2 from "../../Assets/childTicket-info.jpg";
import bannerticket1 from "../../Assets/banner-ticket1.png";
import bannerticket2 from "../../Assets/banner-ticket2.png";

const TicketsData = [
  {
    id: 1,
    title: "Gem Main Galliries",
    museumName: "Main Museum", // Maps to API museum Name
    image: ticket1,
    banner: bannerticket1,
    desc: [
      "Step back in time and explore the wonders of ancient Egypt at the Grand Egyptian Museum.",
      "Within the twelve meticulously curated exhibition halls of the Main Galleries, explore Egypt’s rich history",
      " You can choose to embark on this journey at your own pace or through a 90-minute guided tour.",
    ],
    info: [
      "Guided tours are offered in English and Arabic only.",
      "If you would like to book a private tour in a different language, please contact legacy.booking@hassanallam.com",
      "No outside food or beverage is allowed on the premises",
      "All photos and videos are for personal use only. Commercial use is prohibited without prior written permission",
      "All tickets are non-transferable and non-refundable",
    ],
    prices: [
      { TicketTypeId: 1, TypeName: "Egyptian", Price: 100.00 },
      { TicketTypeId: 2, TypeName: "Foreigner", Price: 300.00 },
    ],
  },
  {
    id: 2,
    title: "Gem Children's Museum",
    museumName: "Children Museum", // Maps to API museum Name
    image: ticket2,
    banner: bannerticket2,
    desc: [
      "An experience designed to ignite your child’s curiosity about their heritage",
      "General admission tickets allow children to explore at their own pace",
      "An informative guidebook helps them make the most of their visit.",
    ],
    info: [
      "Tour is 45 minutes long",
      "Tour is offered in English and Arabic",
      "GEM Children’s Museum is suitable for kids ages 6-12",
      "All tickets are non-transferable and non-refundable",
      "openingHours: Ramadan Hours (March 1-29)",
    ],
    prices: [
      { TicketTypeId: 1, TypeName: "Egyptian", Price: 100.00 },
      { TicketTypeId: 2, TypeName: "Foreigner", Price: 300.00 },
    ],
  },
];

export default TicketsData;