// https://leetcode.com/problems/rectangle-area-ii/solutions/3570731/beats-100-using-line-sweep-algorithm/

type Event = [number, 'open' | 'close', number, number];
type ActiveRectangle = [number, number];
type SweepLine = (polygons: NodeListOf<Element>, mapRightBoundary: number, mapBottomBoundary: number) => number;

const sweepLine: SweepLine = (polygons, mapRightBoundary, mapBottomBoundary) => {
  const events: Event[] = [];
  const activeRectangles: ActiveRectangle[] = [];
  const mod = BigInt(1000000007);
  let totalArea = 0n;

  for (const element of polygons) {
    const { left, right, top, bottom } = element.getBoundingClientRect();

    // Exclude area of polygons outside the map area
    const adjustedTop = top < 0 ? 0 : top;
    const adjustedLeft = left < 0 ? 0 : left;
    const adjustedRight = right > mapRightBoundary ? mapRightBoundary : right;
    const adjustedBottom = bottom > mapBottomBoundary ? mapBottomBoundary : bottom;

    events.push([adjustedTop, 'open', adjustedLeft, adjustedRight]);
    events.push([adjustedBottom, 'close', adjustedLeft, adjustedRight]);
  }

  events.sort((a, b) => a[0] - b[0]);

  let previousY = events[0][0];

  for (const event of events) {
    const [currentY, type, x1, x2] = event;
    let maxLength = 0;
    let currentRight = -1;

    for (const rectangle of activeRectangles) {
      currentRight = Math.max(currentRight, rectangle[0]);
      maxLength += Math.max(0, rectangle[1] - currentRight);
      currentRight = Math.max(currentRight, rectangle[1]);
    }

    totalArea += (BigInt(Math.round(maxLength)) * BigInt(Math.round(currentY - previousY))) % mod;
    totalArea %= mod;

    if (type === 'open') {
      activeRectangles.push([x1, x2]);
      activeRectangles.sort((a, b) => a[0] - b[0]);
    } else {
      for (let i = 0; i < activeRectangles.length; i++) {
        const rectangle = activeRectangles[i];

        if (rectangle[0] === x1 && rectangle[1] === x2) {
          activeRectangles.splice(i, 1);
          break;
        }
      }
    }

    previousY = currentY;
  }

  return Number(totalArea);
};

export default sweepLine;
