import { InputValues } from "../utilities/DamageUtility";

interface OverdamageProps {
  damage: number;
}

const Overdamage: React.FC<OverdamageProps> = (input) => {
  return (
    <>
      <div style={{ marginLeft: "5%" }}>
        You take{" "}
        <span style={{ color: "red", marginLeft: "0px" }}>
          {IsFractional(input.damage) ? input.damage.toFixed(2) : input.damage}
        </span>{" "}
        damage to life pool from forbidden rite trigger.
      </div>
      <div style={{ marginLeft: "5%" }}>
        Increase chaos resistance or lower your health or energy shield.
      </div>
    </>
  );
};

export default Overdamage;

export function IsFractional(num: number) {
  return num % 1 !== 0;
}
