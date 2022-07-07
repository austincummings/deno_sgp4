import { assert } from "./deps.ts";

import { elementsFromTle, propagate } from "../mod.ts";

Deno.test("sanity", () => {
  assert(true);
});

Deno.test("elementsFromTle CALSPHERE 1", () => {
  const objectName = "CALSPHERE 1";
  const line1 =
    "1 00900U 64063C   22187.60620306  .00000364  00000+0  37867-3 0  9997";
  const line2 =
    "2 00900  90.1740  41.2642 0026327 329.2213  52.6376 13.73832931873291";

  const elements = elementsFromTle(objectName, line1, line2);

  assert(elements.OBJECT_NAME === "CALSPHERE 1", "OBJECT_NAME");
  assert(elements.OBJECT_ID === "1964-063C", "OBJECT_ID");
  assert(elements.NORAD_CAT_ID === 900, "NORAD_CAT_ID");
  assert(elements.CLASSIFICATION_TYPE === "U", "CLASSIFICATION_TYPE");
  assert(elements.EPOCH === "2022-07-06T14:32:55.944384001", "EPOCH");
  assert(elements.MEAN_MOTION_DOT === 0.00000364, "MEAN_MOTION_DOT");
  assert(elements.MEAN_MOTION_DDOT === 0, "MEAN_MOTION_DDOT");
  assert(elements.BSTAR === 0.00037867, "BSTAR");
  assert(elements.ELEMENT_SET_NO === 999, "ELEMENT_SET_NO");
  assert(elements.INCLINATION === 90.174, "INCLINATION");
  assert(elements.RA_OF_ASC_NODE === 41.2642, "RA_OF_ASC_NODE");
  assert(elements.ECCENTRICITY === 0.0026327, "ECCENTRICITY");
  assert(elements.ARG_OF_PERICENTER === 329.2213, "ARG_OF_PERICENTER");
  assert(elements.MEAN_ANOMALY === 52.6376, "MEAN_ANOMALY");
  assert(elements.MEAN_MOTION === 13.73832931, "MEAN_MOTION");
  assert(elements.REV_AT_EPOCH === 87329, "REV_AT_EPOCH");
  assert(elements.EPHEMERIS_TYPE === 0, "EPHEMERIS_TYPE");
});

Deno.test("propagate CALSPHERE 1", () => {
  const objectName = "CALSPHERE 1";
  const line1 =
    "1 00900U 64063C   22187.60620306  .00000364  00000+0  37867-3 0  9997";
  const line2 =
    "2 00900  90.1740  41.2642 0026327 329.2213  52.6376 13.73832931873291";

  const elements = elementsFromTle(objectName, line1, line2);

  const start = propagate(elements, 0);
  console.log("start", start);
  const prediction = propagate(elements, 90.0);
  console.log("prediction", prediction);
});
