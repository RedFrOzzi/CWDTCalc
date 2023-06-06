export interface InputValues {
  life: number;
  es: number;
  chaosRes: number;
  ringDamage: number;
  skeletonLvl: number;
  forbiddenRiteLvl: number;
  ringsRadio: string;
  oneRingValue: string;
  twoRingsValue: string;
  cwdtLvl: number;
  cwdtQuality: number;
  cwdtGems: string;
  cwdtGemQualitySup: string;
  cwdtGemQualityDiv: string;
  wardAmount: number;
}

export interface Damage {
  skeletonDamage: number;
  forbiddenRiteDamage: number;
}

export const CalculateDamage = (inputValues: InputValues): Damage => {
  const ringsAmount =
    inputValues.oneRingValue === inputValues.ringsRadio ? 1 : 2;
  return {
    skeletonDamage:
      inputValues.ringDamage * GetSkeleAmount(inputValues) * ringsAmount,
    forbiddenRiteDamage:
      (inputValues.life * 0.4 + inputValues.es * 0.25) *
      (1 - inputValues.chaosRes / 100),
  };
};

function GetSkeleAmount(inputValues: InputValues): number {
  if (inputValues.skeletonLvl < 11) {
    return 2;
  } else if (inputValues.skeletonLvl < 21) {
    return 3;
  } else {
    return 4;
  }
}
