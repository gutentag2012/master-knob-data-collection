export function crc16(data: Uint8Array) {
  let crc = 0xffff;
  for (const byte of data) {
    crc ^= byte << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc & 0xffff;
}

export function commandWithCrc16Checksum(command: Uint8Array) {
  const checksum = crc16(command);
  return Uint8Array.from([...command, checksum & 0xff, (checksum >> 8) & 0xff]);
}
