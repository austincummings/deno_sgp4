use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn elements_from_tle(
  object_name: &str,
  line1: &str,
  line2: &str,
) -> JsValue {
  let elements: sgp4::Elements = sgp4::Elements::from_tle(
    Some(object_name.to_string()),
    line1.as_bytes(),
    line2.as_bytes(),
  )
  .unwrap();

  JsValue::from_serde(&elements).unwrap()
}

#[derive(Serialize, Deserialize)]
pub struct Prediction {
  pub position: [f64; 3],
  pub velocity: [f64; 3],
}

#[wasm_bindgen]
pub fn propagate(elements: &JsValue, t: f64) -> JsValue {
  let elements: sgp4::Elements = elements.into_serde().unwrap();

  let constants = sgp4::Constants::from_elements(&elements).unwrap();

  let prediction: sgp4::Prediction = constants.propagate(t).unwrap();
  let out_prediction = Prediction {
    position: prediction.position,
    velocity: prediction.velocity,
  };

  JsValue::from_serde(&out_prediction).unwrap()
}

#[wasm_bindgen]
pub fn propagate_afspc_compatibility_mode(
  elements: &JsValue,
  t: f64,
) -> JsValue {
  let elements: sgp4::Elements = elements.into_serde().unwrap();

  let constants = sgp4::Constants::from_elements(&elements).unwrap();

  let prediction: sgp4::Prediction =
    constants.propagate_afspc_compatibility_mode(t).unwrap();
  let out_prediction = Prediction {
    position: prediction.position,
    velocity: prediction.velocity,
  };

  JsValue::from_serde(&out_prediction).unwrap()
}
