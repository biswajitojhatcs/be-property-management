import states from "../../../data/india_states_uts.json" with { type: "json" };
import cities from "../../../data/india_cities.json" with { type: "json" };

export const getAllStates = () => {
  return states;
};

export const getCitiesByStateId = (stateId) => {
  return cities.filter((city) => city.stateId === stateId);
};
