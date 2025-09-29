export class Cobs {
  static encode(input: Uint8Array) {
    const result = [0, ...input, 0];
    let pointerByte = 0;
    let counter = 1;

    while (pointerByte + counter < result.length) {
      while (result[pointerByte + counter] !== 0) {
        if (counter === 255) {
          result.splice(pointerByte + 255, 0, 42);
          break;
        }
        counter++;
      }
      if (result[pointerByte + counter] === 0 && counter === 255) {
        result.splice(pointerByte + 255, 0, 42);
      }
      result[pointerByte] = counter;
      pointerByte += counter;
      counter = 1;
    }

    return Uint8Array.from(result);
  }

  static decode(input: Uint8Array) {
    const result = Array.from(input);
    let pointer = result[0] - 1;
    let jumpValue = result[0];
    result.shift();
    let delNext = false;

    while (pointer < result.length - 1) {
      if (jumpValue === 255 || delNext) {
        delNext = result[pointer] === 255;
        jumpValue = result[pointer] - 1;
        result.splice(pointer, 1);
      } else {
        delNext = false;
        jumpValue = result[pointer];
        result[pointer] = 0;
      }
      pointer += jumpValue;
    }

    if (result[result.length - 1] === 0) {
      result.pop();
    }
    return Uint8Array.from(result);
  }
}
