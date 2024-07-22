/**
 * 将微秒转换为播放器时间格式字符串
 *
 * @param microseconds 微秒数
 * @param includeMilliseconds 是否包含毫秒部分，默认为true
 * @returns 播放器时间格式字符串，形如 "00:00:00" 或 "00:00:00.000"
 */
export function convertMicrosecondsToPlayerTime(
  microseconds: number,
  includeMilliseconds: boolean = true
): string {
  const totalMilliseconds = microseconds / 1000;
  const hours = Math.floor(totalMilliseconds / (3600 * 1000));
  const minutes = Math.floor((totalMilliseconds % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
  const milliseconds = Math.floor(totalMilliseconds % 1000);

  let timeString =
    formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);

  if (includeMilliseconds) {
    timeString += ":" + formatMilliseconds(milliseconds);
  }

  function formatTime(value: number): string {
    return value < 10 ? "0" + value : value.toString();
  }
  function formatMilliseconds(value: number): string {
    if (value < 10) {
      return "00" + value;
    } else if (value < 100) {
      return "0" + value;
    } else {
      return value.toString();
    }
  }
  return timeString;
}
