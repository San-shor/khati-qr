// Studio details shown on the demo. Change these in one place.
export const STUDIO = {
  name: "WebNest Studio",
  whatsapp: "8801817618569",
  facebook: "https://www.facebook.com/profile.php?id=61594388112794",
};

export const whatsappLink = (text: string, phone: string = STUDIO.whatsapp) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
