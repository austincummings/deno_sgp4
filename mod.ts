import { instantiate } from "./lib/sgp4_wrapper.generated.js";

const {
  elements_from_tle,
  propagate: propagate_original,
  propagate_afspc_compatibility_mode,
} = await instantiate();

export type Classification = "U" | "C" | "S";

export interface OrbitMeanElementsMessage {
  OBJECT_NAME: string;
  OBJECT_ID: string;
  EPOCH: string;
  MEAN_MOTION: number;
  ECCENTRICITY: number;
  INCLINATION: number;
  RA_OF_ASC_NODE: number;
  ARG_OF_PERICENTER: number;
  MEAN_ANOMALY: number;
  EPHEMERIS_TYPE: number;
  CLASSIFICATION_TYPE: Classification;
  NORAD_CAT_ID: number;
  ELEMENT_SET_NO: number;
  REV_AT_EPOCH: number;
  BSTAR: number;
  MEAN_MOTION_DOT: number;
  MEAN_MOTION_DDOT: number;
}

export interface Prediction {
  /** The three position components (x, y, z) in km */
  position: [x: number, y: number, z: number];

  /** The three velocity components (x, y, z) in km.s⁻¹ */
  velocity: [x: number, y: number, z: number];
}

export function elementsFromTle(
  objectName: string,
  line1: string,
  line2: string,
): OrbitMeanElementsMessage {
  const elements = elements_from_tle(
    objectName,
    line1,
    line2,
  ) as OrbitMeanElementsMessage;

  return elements;
}

/**
 * Calculates the SGP4 position and velocity predictions
 * @param elements The orbital elements to propagate from
 * @param t The number of minutes since epoch (can be positive, negative or zero)
 * @param afspcCompatibilityMode Enable AFSPC compatibility mode
 * @returns
 */
export function propagate(
  elements: OrbitMeanElementsMessage,
  t: number,
  afspcCompatibilityMode = false,
): Prediction {
  if (afspcCompatibilityMode) {
    return propagate_afspc_compatibility_mode(
      elements,
      t,
    );
  } else {
    return propagate_original(
      elements,
      t,
    );
  }
}
