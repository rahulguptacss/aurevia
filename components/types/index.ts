import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text: string;
  button_link: string;
}

export interface FooterData {
  logo: string;
  background: string;
  logo_text: string;
  logo_subtext: string;
  description: string;
  quick_links: LinkType[];
  our_services: LinkType[];
  headings: { quick_links: string; our_services: string; contact: string };
  contact: { address: string; email: string; phone: string; phone_secondary: string; hours: string; hours_secondary: string };
  copyright: string;
  socials: { name: string; href: string }[];
}

export interface HeroFeature {
  icon: string;
  label: string;
}

export interface HeroSlideData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  features: HeroFeature[];
  primary_button: { text: string; href: string };
  secondary_button: { text: string; href: string };
}

export interface HeroSectionData extends HeroSlideData {
  slides?: HeroSlideData[];
}

export interface AboutSectionData {
  badge_value: string;
  badge_label: string;
  badge_note: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  description_secondary: string;
  image: string;
  button: { text: string; href: string };
}

export interface MissionCard {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
}

export interface MissionSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  image_caption: string;
  cards: MissionCard[];
  highlights: { title: string; icon: string }[];
}

export interface WhyChooseItem {
  title: string;
  title_highlight: string;
  text: string;
  icon: string;
}

export interface WhyChooseSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  items: WhyChooseItem[];
}

export interface PropertyItem {
  slug: string;
  title: string;
  location: string;
  price: string;
  price_note: string;
  status: string;
  beds: string;
  baths: string;
  area: string;
  image: string;
  description: string;
}

export interface PropertyDetailsItem extends PropertyItem {
  year: string;
  parking: string;
  gallery: string[];
  overview: string;
  features: string[];
  specs: { label: string; value: string }[];
  amenities: { label: string; icon: string }[];
  floor_plan: string;
  advantages: string[];
  landmarks_image: string;
  landmarks: { name: string; distance: string }[];
}

export interface ClientsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: { name: string; image: string }[];
}

export interface PropertyDetailsSectionData {
  items: PropertyDetailsItem[];
}

export interface PropertiesSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: PropertyItem[];
}

export interface StatsSectionData {
  subtitle: string;
  title: string;
  items: { value: string; label: string; icon: string }[];
}

export interface TestimonialItem {
  title?: string;
  text?: string;
  quote?: string;
  name: string;
  role: string;
  avatar?: string;
  image?: string;
  rating?: number;
}

export interface TestimonialsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: TestimonialItem[];
}

export interface BlogItem {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface BlogDetailsItem extends BlogItem {
  comments: string;
  content: string[];
  work_title: string;
  procedure_title: string;
  procedure: string;
  points: string[];
  gallery: string[];
  after: string[];
}

export interface BlogsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  items: BlogItem[];
}

export interface BlogDetailsSectionData {
  sidebar: {
    related_title: string;
    promo_title: string;
    promo_description: string;
    promo_image: string;
    promo_button: { text: string; href: string };
  };
  items: BlogDetailsItem[];
}

export interface CtaSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  href: string;
  socials: { name: string; href: string }[];
}

export interface TeamSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  members: TeamMember[];
}

export interface ProjectItem {
  title: string;
  location: string;
  status: string;
  image: string;
  description: string;
}

export interface ProjectsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: ProjectItem[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  type?: string;
  video?: string;
}

export interface GallerySectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  filters: string[];
  per_page: number;
  images: GalleryItem[];
}

export interface ContactSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  office_title: string;
  office_text: string;
  image?: string;
  address_label: string;
  address: string;
  phone_label: string;
  phone: string;
  phone_secondary?: string;
  email_label: string;
  email: string;
  hours_label: string;
  hours: string;
  hours_secondary?: string;
  form_title?: string;
  form_text?: string;
  form_subtitle?: string;
  name_placeholder?: string;
  email_placeholder?: string;
  phone_placeholder?: string;
  subject_placeholder?: string;
  message_placeholder?: string;
  button_text?: string;
  map_embed?: string;
  success_message?: string;
}

export interface EnquirySectionData {
  subtitle: string;
  title: string;
  description: string;
  name_placeholder: string;
  phone_placeholder: string;
  email_placeholder: string;
  looking_label: string;
  looking_options: string[];
  location_placeholder: string;
  budget_label: string;
  budget_options: string[];
  timeline_label: string;
  timeline_options: string[];
  message_placeholder: string;
  message_limit: number;
  button_text: string;
  privacy: string;
  reasons_title: string;
  reasons: { icon: string; label: string }[];
}

export interface ThankYouSectionData {
  title: string;
  description: string;
  button: { text: string; href: string };
}

export interface BreadcrumbData {
  title: string;
  items: LinkType[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: { title: string; description?: string };
  components: PageComponent[];
  breadcrumb?: BreadcrumbData;
}

export const siteJson = data;
export const common = data.common;
export const pages = data.pages;
export const sections = data.sections;
export const template = data;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
