export interface MockData {
  Period: string;
  Energy: number;
  predicted?: number;
  precisionArea?: any[];
}

export const mockData1: MockData[] = [
  { Period: "2019-Jan", Energy: 117.45 },
  { Period: "2019-Feb", Energy: 106.08 },
  { Period: "2019-Mar", Energy: 107.91 },
  { Period: "2019-Apr", Energy: 97.91 },
  { Period: "2019-May", Energy: 93.52 },
  { Period: "2019-Jun", Energy: 92.98 },
  { Period: "2019-Jul", Energy: 93.13 },
  { Period: "2019-Aug", Energy: 93.70 },
  { Period: "2019-Sep", Energy: 90.94 },
  { Period: "2019-Oct", Energy: 97.24 },
  { Period: "2019-Nov", Energy: 102.23 },
  { Period: "2019-Dec", Energy: 109.00 },
  { Period: "2020-Jan", Energy: 110.25 },
  { Period: "2020-Feb", Energy: 105.66 },
  { Period: "2020-Mar", Energy: 101.50 },
  { Period: "2020-Apr", Energy: 90.83 },
  { Period: "2020-May", Energy: 88.64 },
  { Period: "2020-Jun", Energy: 89.26 },
  { Period: "2020-Jul", Energy: 94.25 },
  { Period: "2020-Aug", Energy: 92.61  },
  { Period: "2020-Sep", Energy: 89.39 },
  { Period: "2020-Oct", Energy: 94.39 },
  { Period: "2020-Nov", Energy: 105.44 },
  { Period: "2020-Dec", Energy: 116.86 },
  { Period: "2021-Jan", Energy: 113.72 },
  { Period: "2021-Feb", Energy: 111.34 },
  { Period: "2021-Mar", Energy: 113.28 },
  { Period: "2021-Apr", Energy: 102.21 },
  { Period: "2021-May", Energy: 94.62 },
  { Period: "2021-Jun", Energy: 101.101 },
];

export const mockData2: MockData[] = [
  { Period: "2020-Jan", Energy: 632.4 },
  { Period: "2020-Feb", Energy: 960.5 },
  { Period: "2019-Mar", Energy: 796.7 },
  { Period: "2019-Apr", Energy: 915.4 },
  { Period: "2019-May", Energy: 844.5 },
  { Period: "2019-Jun", Energy: 474.4 },
  { Period: "2019-Jul", Energy: 446.4 },
  { Period: "2019-Aug", Energy: 366 },
  { Period: "2019-Sep", Energy: 439.7 },
  { Period: "2019-Oct", Energy: 472.7 },
  { Period: "2019-Nov", Energy: 635.2 },
  { Period: "2019-Dec", Energy: 1091.6 },
  { Period: "2020-Jan", Energy: 632.4 },
  { Period: "2020-Feb", Energy: 460.5 },
  { Period: "2020-Mar", Energy: 396.7 },
  { Period: "2020-Apr", Energy: 515.4 },
  { Period: "2020-May", Energy: 644.5 },
  { Period: "2020-Jun", Energy: 574.4 },
];

export const mockData3 = [
  { Period: "2020-Jan", Energy: 632.4 },
  { Period: "2020-Feb", Energy: 460.5 },
  { Period: "2020-Mar", Energy: 396.7 },
  { Period: "2020-Apr", Energy: 515.4 },
  { Period: "2020-May", Energy: 644.5 },
  { Period: "2020-Jun", Energy: 574.4 },
];

export const growingGeneral: {
  p: number;
  sales: number | null;
  predicted?: number | null;
}[] = [
  { p: 1, sales: 500 },
  { p: 2, sales: 561 },
  { p: 3, sales: 612 },
  { p: 4, sales: 663 },
  { p: 5, sales: 728 },
  { p: 6, sales: 810 },
  { p: 7, sales: 880 },
  { p: 8, sales: 850 },
  { p: 9, sales: 918 },
  { p: 10, sales: 1026 },
  { p: 11, sales: 1060 },
  { p: 12, sales: 1155 },
  { p: 1, sales: 530 },
  { p: 2, sales: 572 },
  { p: 3, sales: 660 },
  { p: 4, sales: 663 },
  { p: 5, sales: 756 },
  { p: 6, sales: 795 },
  { p: 7, sales: 816 },
  { p: 8, sales: 935 },
  { p: 9, sales: 954 },
  { p: 10, sales: 1007 },
  { p: 11, sales: 1020 },
  { p: 12, sales: 1071 },
  { p: 1, sales: 530 },
  { p: 2, sales: 561 },
  { p: 3, sales: 648 },
  { p: 4, sales: 689 },
  { p: 5, sales: 700 },
  { p: 6, sales: 795 },
];
