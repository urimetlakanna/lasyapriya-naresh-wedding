/**
 * ───────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE — names, dates, times, venues, wording.
 *  Anything marked `null` is "To be announced" and will show that
 *  message automatically. To confirm a time, replace `null` with
 *  e.g.  { en: "10:00 AM", te: "ఉదయం 10:00 గంటలకు" }
 * ───────────────────────────────────────────────────────────────
 */

export type Lang = "en" | "te";
export type Bi = { en: string; te: string };

/** Wedding muhurtham — 18 Nov 2026, 10:12 AM IST */
export const WEDDING_MOMENT = "2026-11-18T10:12:00+05:30";

export const couple = {
  bride: {
    name: { en: "Lasya Priya", te: "లాస్య ప్రియ" },
    nick: { en: "Priyanka", te: "ప్రియాంక" },
    full: { en: "Lasya Priya (Priyanka)", te: "లాస్య ప్రియ (ప్రియాంక)" },
    qual: { en: "M.Pharm", te: "ఎం.ఫార్మ్" },
  },
  groom: {
    name: { en: "Naresh", te: "నరేష్" },
    surname: { en: "Mudhiraj", te: "ముదిరాజ్" },
    full: { en: "Naresh Mudhiraj", te: "నరేష్ ముదిరాజ్" },
    qual: { en: "B.Com", te: "బి.కామ్" },
  },
};

/**
 * Family names — kept exactly as supplied. Please verify spellings
 * (Telugu spellings are transliterations of the English names).
 */
export const families = {
  bride: [
    { en: "Smt. & Sri Pittala Laxmi – Ramesh Mudhiraj", te: "శ్రీమతి & శ్రీ పిట్టల లక్ష్మి – రమేష్ ముదిరాజ్" },
    { en: "Smt. & Sri Pittala Padma – Ravi Mudhiraj", te: "శ్రీమతి & శ్రీ పిట్టల పద్మ – రవి ముదిరాజ్" },
  ] as Bi[],
  groom: [
    { en: "Kolu Laxmi – (Late) Yadaiah", te: "కొల్లు లక్ష్మి – (స్వర్గీయ) యాదయ్య" },
  ] as Bi[],
};

export type EventData = {
  id: "haldi" | "wedding" | "reception";
  title: Bi;
  blurb: Bi;
  day: number;
  month: Bi;
  year: number;
  weekday: Bi;
  time: Bi | null;
  venueName: Bi;
  address: Bi | null;
  /** Used for Google Maps search + directions. Replace with an exact pin URL in `mapUrl` if you have one. */
  mapQuery: string;
  mapUrl?: string;
};

const NOV: Bi = { en: "November", te: "నవంబర్" };

export const events: EventData[] = [
  {
    id: "haldi",
    title: { en: "Haldi Ceremony", te: "హల్దీ వేడుక" },
    blurb: {
      en: "An auspicious ritual of turmeric, blessings and joy.",
      te: "పసుపు, ఆశీస్సులు, ఆనందాల శుభ ఘట్టం.",
    },
    day: 17,
    month: NOV,
    year: 2026,
    weekday: { en: "Tuesday", te: "మంగళవారం" },
    time: null,
    venueName: { en: "Mallikarjun Nagar, RKP", te: "మల్లికార్జున్ నగర్, ఆర్.కె.పి." },
    address: { en: "Mallikarjun Nagar, Ramakrishnapur, Mancherial District, Telangana.", te: "మల్లికార్జున్ నగర్, రామకృష్ణాపూర్, మంచిర్యాల జిల్లా, తెలంగాణ." },
    mapQuery: "Mallikarjun Nagar, Ramakrishnapur, Mancherial, Telangana",
  },
  {
    id: "wedding",
    title: { en: "Wedding Ceremony", te: "వివాహ మహోత్సవం" },
    blurb: {
      en: "The sacred union of Lasya Priya & Naresh.",
      te: "లాస్య ప్రియ & నరేష్ ల పవిత్ర వివాహ బంధం.",
    },
    day: 18,
    month: NOV,
    year: 2026,
    weekday: { en: "Wednesday", te: "బుధవారం" },
    time: { en: "Muhurtham 10:12 AM", te: "ముహూర్తం ఉదయం 10:12" },
    venueName: { en: "Bride’s Residence", te: "వధువు నివాసం" },
    address: {
      en: "Mallikarjun Nagar, Super Bazar, Ramakrishnapur, Mancherial District, Telangana.",
      te: "మల్లికార్జున్ నగర్, సూపర్ బజార్, రామకృష్ణాపూర్, మంచిర్యాల జిల్లా, తెలంగాణ.",
    },
    mapQuery: "Mallikarjun Nagar, Super Bazar, Ramakrishnapur, Mancherial, Telangana",
  },
  {
    id: "reception",
    title: { en: "Reception", te: "రిసెప్షన్" },
    blurb: {
      en: "A celebration in honour of the newly married couple.",
      te: "నూతన వధూవరులను ఆశీర్వదించే శుభ వేడుక.",
    },
    day: 19,
    month: NOV,
    year: 2026,
    weekday: { en: "Thursday", te: "గురువారం" },
    time: null,
    venueName: { en: "MK Function Hall", te: "ఎం.కె. ఫంక్షన్ హాల్" },
    address: null,
    mapQuery: "MK Function Hall, Armoor, Telangana",
  },
];

export const weddingDetails = {
  muhurtham: { en: "10:12 AM", te: "ఉదయం 10:12" },
  nakshatram: { en: "Shatabhisha Nakshatram", te: "శతభిష నక్షత్రం" },
  lagnam: { en: "Dhanur Lagnam", te: "ధనుర్ లగ్నం" },
  lunch: {
    en: "Lunch follows the wedding ceremony.",
    te: "వివాహానంతరం భోజన ఏర్పాట్లు కలవు.",
  },
};

/**
 * Photo crops. Coordinates are fractions of the original photo:
 *   fx / fy = focus point (0–1), zoom = magnification, r = frame width ÷ height
 *   source  = "landscape" (wide photo) or "portrait" (tall photo)
 * Nudge fx / fy if you'd like a different framing.
 */
export type CropSpec = { source: "landscape" | "portrait"; fx: number; fy: number; zoom: number; r: number; index?: number };

export const crops = {
  hero: { source: "landscape", index: 0, fx: 0.43, fy: 0.5, zoom: 1.04, r: 0.8 } as CropSpec,
  bride: { source: "portrait", index: 7, fx: 0.5, fy: 0.5, zoom: 1.0, r: 0.8 } as CropSpec,
  groom: { source: "portrait", index: 6, fx: 0.5, fy: 0.5, zoom: 1.0, r: 0.8 } as CropSpec,
  together: { source: "landscape", index: 1, fx: 0.5, fy: 0.5, zoom: 1, r: 1.5 } as CropSpec,
};

export const gallery: { crop: CropSpec; label: Bi }[] = [
  { crop: { source: "landscape", index: 0, fx: 0.42, fy: 0.52, zoom: 1, r: 1.15 }, label: { en: "A golden-hour promise", te: "సంధ్యా వేళ ఓ అందమైన వాగ్దానం" } },
  { crop: { source: "landscape", index: 1, fx: 0.52, fy: 0.52, zoom: 1, r: 1.15 }, label: { en: "A moment just for two", te: "ఇద్దరి కోసం ఓ మధుర క్షణం" } },
  { crop: { source: "portrait", index: 2, fx: 0.5, fy: 0.52, zoom: 1, r: 0.78 }, label: { en: "Closer, always", te: "ఎప్పటికీ దగ్గరగా" } },
  { crop: { source: "portrait", index: 3, fx: 0.5, fy: 0.5, zoom: 1, r: 0.78 }, label: { en: "Together in blessings", te: "ఆశీస్సులతో కలిసిన వేళ" } },
  { crop: { source: "portrait", index: 4, fx: 0.5, fy: 0.44, zoom: 1, r: 0.78 }, label: { en: "The Groom · Naresh", te: "వరుడు · నరేష్" } },
  { crop: { source: "portrait", index: 5, fx: 0.5, fy: 0.45, zoom: 1, r: 0.78 }, label: { en: "The Bride · Lasya Priya", te: "వధువు · లాస్య ప్రియ" } },
  { crop: { source: "portrait", index: 6, fx: 0.5, fy: 0.48, zoom: 1, r: 0.78 }, label: { en: "A tender embrace", te: "ఓ ఆప్యాయ ఆలింగనం" } },
  { crop: { source: "landscape", index: 7, fx: 0.48, fy: 0.5, zoom: 1, r: 1.15 }, label: { en: "A frame to remember", te: "ఎప్పటికీ గుర్తుండే చిత్రం" } },
  { crop: { source: "landscape", index: 8, fx: 0.5, fy: 0.5, zoom: 1, r: 1.15 }, label: { en: "Our beginning", te: "మా కొత్త ఆరంభం" } },
  { crop: { source: "portrait", index: 9, fx: 0.5, fy: 0.5, zoom: 1, r: 0.78 }, label: { en: "A cherished memory", te: "ఓ మధుర జ్ఞాపకం" } },
];

export const ui = {
  shubhamastu: { en: "Shubhamastu", te: "శుభమస్తు" },
  weddingInvite: { en: "The Wedding Invitation", te: "శుభ వివాహ ఆహ్వానం" },
  youAreInvited: { en: "You are cordially invited", te: "మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము" },
  chooseLang: { en: "Choose your language · భాషను ఎంచుకోండి", te: "భాషను ఎంచుకోండి · Choose your language" },
  openInvite: { en: "Open Invitation", te: "ఆహ్వానాన్ని తెరవండి" },
  scroll: { en: "Scroll", te: "క్రిందికి" },

  inviteHeading: { en: "With Blessings & Joy", te: "ఆశీస్సులతో, ఆనందంతో" },
  inviteTe:
    "పెద్దల ఆశీస్సులతో, భగవంతుని కృపతో లాస్యప్రియ (ప్రియాంక) మరియు నరేష్ ముదిరాజ్ ల వివాహ మహోత్సవానికి మీరు కుటుంబ సమేతంగా విచ్చేసి, నూతన వధూవరులను ఆశీర్వదించవలసిందిగా సవినయంగా కోరుతున్నాము.",
  inviteEn:
    "With the blessings of our elders and the grace of the Almighty, we joyfully invite you and your family to the wedding of Lasya Priya (Priyanka) and Naresh Mudhiraj, and to bless the newly-wedded couple with your presence.",

  theCouple: { en: "The Couple", te: "వధూవరులు" },
  bride: { en: "The Bride", te: "వధువు" },
  groom: { en: "The Groom", te: "వరుడు" },
  togetherCaption: { en: "Two hearts, one beautiful journey", te: "రెండు హృదయాలు, ఒకే అందమైన ప్రయాణం" },

  familiesTitle: { en: "With the Blessings of", te: "వీరి ఆశీస్సులతో" },
  brideFamily: { en: "Bride’s Family", te: "వధువు కుటుంబం" },
  groomFamily: { en: "Groom’s Family", te: "వరుడి కుటుంబం" },
  invitedBy: { en: "Invited By", te: "ఆహ్వానించువారు" },

  celebrations: { en: "The Celebrations", te: "వేడుకలు" },
  celebrationsSub: { en: "Three auspicious days · Three joyous gatherings", te: "మూడు శుభ దినాలు · మూడు ఆనంద వేడుకలు" },
  time: { en: "Time", te: "సమయం" },
  tba: { en: "To be announced", te: "త్వరలో తెలియజేయబడును" },
  venue: { en: "Venue", te: "వేదిక" },
  directions: { en: "Get Directions", te: "మార్గం చూడండి" },
  viewMap: { en: "View Map", te: "మ్యాప్ చూడండి" },
  hideMap: { en: "Hide Map", te: "మ్యాప్ మూసివేయండి" },
  muhurtham: { en: "Muhurtham", te: "ముహూర్తం" },
  nakshatram: { en: "Nakshatram", te: "నక్షత్రం" },
  lagnam: { en: "Lagnam", te: "లగ్నం" },

  countdownTitle: { en: "Counting down to the Muhurtham", te: "శుభ ముహూర్తానికి మిగిలిన సమయం" },
  days: { en: "Days", te: "రోజులు" },
  hours: { en: "Hours", te: "గంటలు" },
  minutes: { en: "Minutes", te: "నిమిషాలు" },
  seconds: { en: "Seconds", te: "సెకన్లు" },
  countdownDone: {
    en: "The auspicious moment has arrived — thank you for your blessings.",
    te: "శుభ ముహూర్తం వచ్చింది — మీ ఆశీస్సులకు ధన్యవాదాలు.",
  },

  gallery: { en: "Our Moments", te: "మా మధుర క్షణాలు" },
  gallerySub: { en: "A few frames from our story", te: "మా కథలోని కొన్ని అందమైన చిత్రాలు" },

  shareTitle: { en: "Share the Joy", te: "ఆనందాన్ని పంచుకోండి" },
  shareSub: {
    en: "Send this invitation to family and friends who should be with us.",
    te: "మాతో ఉండాల్సిన బంధుమిత్రులకు ఈ ఆహ్వానాన్ని పంపండి.",
  },
  shareWa: { en: "Share on WhatsApp", te: "వాట్సాప్‌లో షేర్ చేయండి" },
  shareMore: { en: "More options", te: "ఇతర మార్గాలు" },
  copyLink: { en: "Copy Link", te: "లింక్ కాపీ చేయండి" },
  copied: { en: "Link copied ✓", te: "లింక్ కాపీ అయింది ✓" },

  closingKicker: { en: "With Love & Gratitude", te: "ప్రేమతో, కృతజ్ఞతతో" },
  closingTitle: { en: "Your presence is our greatest blessing", te: "మీ రాకే మాకు గొప్ప ఆశీర్వాదం" },
  closingBody: {
    en: "Come, bless us as we begin our new life together.",
    te: "మా నూతన జీవిత ప్రయాణాన్ని మీ ఆశీస్సులతో ప్రారంభించనివ్వండి.",
  },
  closingSign: { en: "With love, Lasya Priya & Naresh", te: "ప్రేమతో, లాస్య ప్రియ & నరేష్" },
  backToTop: { en: "Back to the beginning", te: "మొదటికి వెళ్ళండి" },

  musicOn: { en: "Pause music", te: "సంగీతం ఆపండి" },
  musicOff: { en: "Play music", te: "సంగీతం ప్లే చేయండి" },
  switchLang: { en: "Switch to Telugu", te: "ఇంగ్లీష్‌కి మార్చండి" },
};

export type UiKey = {
  [K in keyof typeof ui]: (typeof ui)[K] extends Bi ? K : never;
}[keyof typeof ui];

export const shareMessage = (url: string) =>
  `🙏 శుభమస్తు! లాస్య ప్రియ (ప్రియాంక) & నరేష్ ముదిరాజ్ ల వివాహ మహోత్సవానికి మిమ్మల్ని కుటుంబ సమేతంగా సాదరంగా ఆహ్వానిస్తున్నాము.\n` +
  `📅 18 నవంబర్ 2026 (బుధవారం) · ముహూర్తం ఉదయం 10:12\n` +
  `📍 రామకృష్ణాపూర్, మంచిర్యాల జిల్లా\n\n` +
  `🙏 Shubhamastu! You are warmly invited to the wedding of Lasya Priya (Priyanka) & Naresh Mudhiraj.\n` +
  `📅 Wednesday, 18 November 2026 · Muhurtham 10:12 AM\n` +
  `📍 Ramakrishnapur, Mancherial District\n\n` +
  `${url}`;
