import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { optimise } from "../../../redux/actions/optimiserActions";
import { OptimiseButton, OptimiseButtonWrapper } from "./OptimiseButtonStyles";
import OptimisationTypes from "../../../optimiser/optimisationTypes";

let hasAutoOptimised = true;
export default () => {
  const subjects = useSelector(state => state.subjects);
  const optimisations = useSelector(state => state.optimisations);
  const optimiser = useSelector(state => state.optimiser);
  const dispatch = useDispatch();
  // Get subject keys
  const keys = Object.keys(subjects);
  const allLoaded = !keys.some(key => subjects[key].data === null);

  // const toggleSidebar = () => {
  //   this.Sidebar.maxWidth = 0px,
  //   this.Sidebar.minWidth = 0px
  // }

  const invokeOptimisation = () => {
    const optimisationTypes = [];
    const {
      range: { min, max },
      avoidDays,
      skipLectures,
      cramClasses,
      breakHours,
      minimiseClashes
    } = optimisations;
    const { reserved } = optimiser;

    if (minimiseClashes) {
      optimisationTypes.push({ type: OptimisationTypes.AVOID_CLASHES });
    }
    if (breakHours) {
      optimisationTypes.push({
        type: OptimisationTypes.LONGEST_RUN,
        data: breakHours === "" ? 24 : breakHours
      });
    }
    if (avoidDays.length !== 0) {
      for (const index of avoidDays) {
        optimisationTypes.push({
          type: OptimisationTypes.AVOID_DAYS,
          data: index
        });
      }
    }
    if (cramClasses) {
      if (skipLectures) {
        optimisationTypes.push({
          type: OptimisationTypes.CRAM_CLASSES_SKIP_LECTURES
        });
      } else {
        optimisationTypes.push({
          type: OptimisationTypes.CRAM_CLASSES
        });
      }
    }
    const restrictions = {
      earliestStart: min,
      latestFinish: max
    };
    dispatch(optimise(subjects, optimisationTypes, restrictions, reserved));
  };

  if (
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
    allLoaded &&
    keys.length > 0 &&
    !hasAutoOptimised
  ) {
    console.log("All loaded!");
    console.log(subjects);
    invokeOptimisation();
    hasAutoOptimised = true;
  }
  return (
    <OptimiseButtonWrapper>
      <OptimiseButton
        disabled={!allLoaded}
        onClick={() => invokeOptimisation()}
      >
        {allLoaded ? "Optimise" : "Loading..."}
      </OptimiseButton>
    </OptimiseButtonWrapper>
  );
};