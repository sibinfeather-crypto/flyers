import { BUSINESS_INFO } from '../data/catalog';

export function getWhatsAppOrderUrl(productName: string, price?: number | string, category?: string): string {
  const basePhone = BUSINESS_INFO.phone;
  let text = `Hi The Flyer's! 🏁\n\nI am interested in ordering: *${productName}*`;
  
  if (price) {
    text += ` (Offer: ₹${price})`;
  }
  if (category) {
    text += `\nCategory: ${category}`;
  }
  
  text += `\n\nPlease share availability, pictures, and delivery timeline for my pincode. Thanks!`;
  
  return `https://wa.me/91${basePhone}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppGeneralInquiryUrl(customQuery?: string): string {
  const basePhone = BUSINESS_INFO.phone;
  const message = customQuery 
    ? `Hi The Flyer's! 🏁\n\n${customQuery}`
    : `Hi The Flyer's! 🏁 I saw your accessories & spares catalog online. I would like to make an inquiry for my vehicle.`;
  
  return `https://wa.me/91${basePhone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppTyreInquiryUrl(bikeModel?: string, tyreSize?: string): string {
  const basePhone = BUSINESS_INFO.phone;
  let text = `Hi The Flyer's! 🏁\n\nI want to inquire about *Track-Used Tyres*.\n`;
  if (bikeModel) text += `Bike Model: ${bikeModel}\n`;
  if (tyreSize) text += `Preferred Tyre Size: ${tyreSize}\n`;
  text += `Please send available brand options (Pirelli/Metzeler/Michelin) with photos and pricing.`;

  return `https://wa.me/91${basePhone}?text=${encodeURIComponent(text)}`;
}
