import React from "react";
import { Damage, InputValues } from "../utilities/DamageUtility";
import "../css/FailedLoop.css";
import { IsFractional } from "./FROverdamage";

interface LoopProps {
  inputValues: InputValues;
  damage: Damage;
  damageThreshold: number;
}

const FailedLoopModule: React.FC<LoopProps> = ({
  inputValues,
  damage,
  damageThreshold,
}) => {
  const neededDamage =
    -damage.skeletonDamage - damage.forbiddenRiteDamage + damageThreshold;

  return (
    <>
      <span>
        Self damge is not met cwdt damage threshold. You need
        {" " +
          (IsFractional(neededDamage)
            ? neededDamage.toFixed(2)
            : neededDamage) +
          " "}
        more.
      </span>
      <br />
      <span>Possible fix:</span>
      <ul>
        {inputValues.skeletonLvl < 11 && (
          <li>Increase summon skeletons gem level to 11</li>
        )}
        {inputValues.ringDamage < 420 && (
          <li>Equip Heartbound ring with more damage on minion death</li>
        )}
        {inputValues.ringsRadio === "true" && (
          <li>
            Equip two rings instead of one to double the damage from summoning
            skeletons
          </li>
        )}
        <li>Lower your chaos resistance for more damage from forbidden rite</li>
        <li>
          Increase life or energy shield to increase forbidden rite damage
        </li>
        {inputValues.cwdtGems === "true" && (
          <li>Use divergent quality CWDT gem</li>
        )}
        {inputValues.cwdtGems === "false" && inputValues.cwdtQuality < 23 && (
          <li>Increase quality of CWDT gem</li>
        )}
        {inputValues.skeletonLvl > 10 && inputValues.skeletonLvl < 21 && (
          <li>Increase summon skeletons gem level to 21</li>
        )}
        <li>
          Check guide for more information
          <a
            href="https://www.pathofexile.com/forum/view-thread/3261066"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Guide
          </a>
        </li>
      </ul>
    </>
  );
};

export default FailedLoopModule;
