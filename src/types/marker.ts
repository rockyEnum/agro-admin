export type MarkerStatus = "online" | "offline" | "error";

export interface MarkerStats {
  total: number;
  normal: number;
  abnormal: number;
}

export interface MarkerDetail {
  name: string;
  nodeCode: string;
  nodeType: string;
  lastReportTime: string;
  status: MarkerStatus;
  stats?: MarkerStats;
}

