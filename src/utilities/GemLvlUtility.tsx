import { InputValues } from "./DamageUtility";

const CWDTGem = {
  0: 100000,
  1: 528,
  2: 583,
  3: 661,
  4: 725,
  5: 812,
  6: 897,
  7: 1003,
  8: 1107,
  9: 1221,
  10: 1354,
  11: 1485,
  12: 1635,
  13: 1804,
  14: 1980,
  15: 2184,
  16: 2394,
  17: 2621,
  18: 2874,
  19: 3142,
  20: 3272,
  21: 3580,
  22: 3950,
  23: 4350,
};

export const GetCWDTThreshold = (inputValues: InputValues): number => {
  const gemPercentReduction =
    inputValues.cwdtGems === "false" ? inputValues.cwdtQuality : 0;
  const gemThreshold =
    CWDTGem[inputValues.cwdtLvl as keyof typeof CWDTGem] *
    (1 - gemPercentReduction / 100);
  return gemThreshold;
};
