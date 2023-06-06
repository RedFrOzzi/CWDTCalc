import React, { useEffect, useState } from "react";
import "../css/Calc.css";
import {
  InputValues,
  Damage,
  CalculateDamage,
} from "../utilities/DamageUtility";
import { GetCWDTThreshold } from "../utilities/GemLvlUtility";
import IsLoopWorks from "../utilities/LoopStatus";
import FailedLoopModule from "./FailedLoop";
import Overdamage, { IsFractional } from "./FROverdamage";
import Footer from "./Footer";

const Calc: React.FC = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    life: 2500,
    es: 0,
    chaosRes: -60,
    ringDamage: 420,
    skeletonLvl: 11,
    forbiddenRiteLvl: 21,
    cwdtLvl: 20,
    cwdtQuality: 20,
    ringsRadio: "false",
    oneRingValue: "true",
    twoRingsValue: "false",
    cwdtGems: "true",
    cwdtGemQualitySup: "true",
    cwdtGemQualityDiv: "false",
    wardAmount: 1200,
  });

  const [damage, setTotalDamage] = useState<Damage>({
    skeletonDamage: 0,
    forbiddenRiteDamage: 0,
  });

  const [damageThreshold, setDamageThreshold] = useState<number>(0);

  const [excessiveDamge, setExcessiveDamage] = useState<number>(0);

  useEffect(() => {
    setTotalDamage(CalculateDamage(inputValues));
    setDamageThreshold(GetCWDTThreshold(inputValues));
    setExcessiveDamage(
      ExcessiveDamage(inputValues.wardAmount, damage.forbiddenRiteDamage)
    );
  }, [inputValues, damage.forbiddenRiteDamage]);

  const OnValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const LoopWorks = IsLoopWorks(damageThreshold, damage);

  const ExcessiveDamage = (ward: number, frDamage: number): number => {
    const dmg = ward - frDamage;
    return dmg > 0 ? 0 : -dmg;
  };

  return (
    <div className="box-container">
      <div className="calc-box">
        <div className="calc">
          <h1>CWDT Calculator</h1>
          <h3>Resourses</h3>
          <label htmlFor="life">Maximum life</label>
          <input
            type="number"
            name="life"
            value={inputValues.life}
            onChange={OnValuesChange}
          />
          <br />
          <label htmlFor="es">Maximum energy shield</label>
          <input
            type="number"
            name="es"
            value={inputValues.es}
            onChange={OnValuesChange}
          />
          <br />
          <label htmlFor="chaosRes">Chaos resistance</label>
          <input
            type="number"
            name="chaosRes"
            value={inputValues.chaosRes}
            onChange={OnValuesChange}
          />
          <br />
          <h3>Rings</h3>
          <label htmlFor="ringsAmount">Heartbound rings</label>
          <input
            id="ringOne"
            type="radio"
            name="ringsRadio"
            value={inputValues.oneRingValue}
            checked={inputValues.ringsRadio === inputValues.oneRingValue}
            onChange={OnValuesChange}
          />
          One
          <input
            type="radio"
            name="ringsRadio"
            value={inputValues.twoRingsValue}
            checked={inputValues.ringsRadio === inputValues.twoRingsValue}
            onChange={OnValuesChange}
          />
          Two
          <br />
          <label htmlFor="ringDamage">Heartbound damage on minion death</label>
          <input
            type="number"
            name="ringDamage"
            value={inputValues.ringDamage}
            onChange={OnValuesChange}
          />
          <br />
          <h3>Gems</h3>
          <label htmlFor="skeletonLvl">
            Summon skeletons gem level (after +1/+2)
          </label>
          <input
            type="number"
            name="skeletonLvl"
            value={inputValues.skeletonLvl}
            onChange={OnValuesChange}
          />
          <br />
          <label htmlFor="cwdtLvl">
            CWDT gem level (after +1/+2 from body armor)
          </label>
          <input
            type="number"
            name="cwdtLvl"
            value={inputValues.cwdtLvl}
            onChange={OnValuesChange}
          />
          <br />
          <label htmlFor="cwdtQuality">CWDT quality</label>
          <input
            type="number"
            name="cwdtQuality"
            value={inputValues.cwdtQuality}
            onChange={OnValuesChange}
          />
          <br />
          <label htmlFor="cwdtGemQuality">CWDT gem quality type</label>
          <input
            id="cwdtQualSup"
            type="radio"
            name="cwdtGems"
            value={inputValues.cwdtGemQualitySup}
            checked={inputValues.cwdtGemQualitySup === inputValues.cwdtGems}
            onChange={OnValuesChange}
          />
          Superior (normal)
          <input
            type="radio"
            name="cwdtGems"
            value={inputValues.cwdtGemQualityDiv}
            checked={inputValues.cwdtGemQualityDiv === inputValues.cwdtGems}
            onChange={OnValuesChange}
          />
          Divergent
          <br />
          <span className="left-side">CWDT damage threshold</span>
          <span>
            {IsFractional(damageThreshold)
              ? damageThreshold.toFixed(2)
              : damageThreshold}
          </span>
          <h3>Ward</h3>
          <label htmlFor="">Ward amount with flask on</label>
          <input
            type="number"
            name="wardAmount"
            value={inputValues.wardAmount}
            onChange={OnValuesChange}
          />
          <h3>Damage taken</h3>
          <span className="left-side">
            Damage from ring{inputValues.ringsRadio === "true" ? "" : "s"}
          </span>
          <span>
            {IsFractional(damage.skeletonDamage)
              ? damage.skeletonDamage.toFixed(2)
              : damage.skeletonDamage}
          </span>
          <br />
          <span className="left-side">Forbidden rite damage</span>
          <span>
            {IsFractional(damage.forbiddenRiteDamage)
              ? damage.forbiddenRiteDamage.toFixed(2)
              : damage.forbiddenRiteDamage}
          </span>
          <br />
          <span className="left-side">Total damage</span>
          <span>
            {IsFractional(damage.skeletonDamage + damage.forbiddenRiteDamage)
              ? (damage.skeletonDamage + damage.forbiddenRiteDamage).toFixed(2)
              : damage.skeletonDamage + damage.forbiddenRiteDamage}
          </span>
          <br />
          {damage.forbiddenRiteDamage > inputValues.wardAmount && (
            <>
              <span className="left-side">Damage to life pool</span>
              <span>
                {IsFractional(excessiveDamge)
                  ? excessiveDamge.toFixed(2)
                  : excessiveDamge}
              </span>
            </>
          )}
          <h3>Loop status</h3>
          <span className="loop-status" style={{ color: LoopWorks.color }}>
            {LoopWorks.isWorking}
          </span>
          {LoopWorks.isWorking === "Loop fails" && (
            <FailedLoopModule
              inputValues={inputValues}
              damage={damage}
              damageThreshold={damageThreshold}
            />
          )}
          {excessiveDamge > 0 && <Overdamage damage={excessiveDamge} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calc;
