import classNames from "classnames";
import { useGameState } from "../Global";
import { getScienceFromWorkers } from "../logic/BuildingLogic";
import { getHappinessIcon } from "../logic/HappinessLogic";
import { getResourceAmount } from "../logic/ResourceLogic";
import { useCurrentTick } from "../logic/TickLogic";
import { sizeOf } from "../utilities/Helper";
import { L, t } from "../utilities/i18n";
import { FormatNumber } from "./HelperComponents";

export function ResourcePanel(): React.ReactNode {
   const tick = useCurrentTick();
   const gs = useGameState();
   const { workersAvailableAfterHappiness, workersBusy } = getScienceFromWorkers(gs);
   return (
      <div className="resource-bar window">
         {tick.happiness ? (
            <div className="row" aria-label={t(L.Happiness)} data-balloon-pos="down" data-balloon-text="left">
               <div
                  className={classNames({
                     "m-icon": true,
                     "text-red": tick.happiness.value < 0,
                     "text-green": tick.happiness.value > 0,
                  })}
               >
                  {getHappinessIcon(tick.happiness.value)}
               </div>
               <div className="f1">{tick.happiness.value}</div>
            </div>
         ) : null}
         <div className="separator-vertical" />
         <div
            className="row"
            aria-label={t(L.WorkersAvailable)}
            data-balloon-pos="down"
            data-balloon-text="left"
         >
            <div
               className={classNames({
                  "m-icon": true,
               })}
            >
               person
            </div>
            <div className="f1">
               <FormatNumber value={workersAvailableAfterHappiness} />
            </div>
         </div>
         <div className="separator-vertical" />
         <div className="row" aria-label={t(L.WorkersBusy)} data-balloon-pos="down" data-balloon-text="left">
            <div
               className={classNames({
                  "m-icon": true,
               })}
            >
               directions_walk
            </div>
            <div className="f1">
               <FormatNumber value={workersBusy} />
            </div>
         </div>

         <div className="separator-vertical" />
         <div className="row" aria-label={t(L.Science)} data-balloon-pos="down" data-balloon-text="left">
            <div
               className={classNames({
                  "m-icon": true,
               })}
            >
               science
            </div>
            <div className="f1">
               <FormatNumber value={getResourceAmount("Science", gs)} />
            </div>
         </div>
         <div className="separator-vertical" />
         <div
            className="row"
            aria-label={t(L.NotProducingBuildings)}
            data-balloon-pos="down"
            data-balloon-text="left"
         >
            <div
               className={classNames({
                  "m-icon": true,
               })}
            >
               domain_disabled
            </div>
            <div className="f1">
               <FormatNumber value={sizeOf(tick.notProducingReasons)} />
            </div>
         </div>
         <div className="separator-vertical" />
         <div
            className="row"
            aria-label={t(L.TotalEmpireValue)}
            data-balloon-pos="down"
            data-balloon-text="left"
         >
            <div
               className={classNames({
                  "m-icon": true,
               })}
            >
               account_balance
            </div>
            <div className="f1">
               <FormatNumber value={tick.totalValue} />
            </div>
         </div>
      </div>
   );
}
