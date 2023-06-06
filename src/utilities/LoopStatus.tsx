import { Damage } from "./DamageUtility";

export interface IsWorking {
  isWorking: string;
  color: string;
}

const IsLoopWorks = (damageThreshold: number, damage: Damage): IsWorking => {
  if (
    damageThreshold - (damage.skeletonDamage + damage.forbiddenRiteDamage) <
    0
  ) {
    return { isWorking: "Loop is working", color: "rgb(16, 177, 16)" };
  }

  return { isWorking: "Loop fails", color: "rgb(187, 12, 12)" };
};

export default IsLoopWorks;
