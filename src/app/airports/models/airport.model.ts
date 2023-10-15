export interface AirportsResponse {
  meta: AirportMeta;
  data: AirportData[];
}

export interface AirportDetailsResponse {
  meta: AirportMeta;
  data: AirportData;
}

export interface AirportMeta {
  count: number;
  links: AirportLinks;
}

export interface AirportLinks {
  first: string;
  self: string;
  last: string;
  previous: string;
  next: string;
}

export interface AirportData {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: AirportSelf;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: GeoCode;
  address: AirportAddress;
  analytics: AirportAnalytics;
}

export interface AirportSelf {
  href: string;
  methods: string[];
}

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface AirportAddress {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  stateCode?: string;
  regionCode: string;
}

export interface AirportAnalytics {
  travelers: Travelers;
}

export interface Travelers {
  score: number;
}
