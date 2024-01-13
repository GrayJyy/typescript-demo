type tuple = [1, true, 'a']
type Push<Arr extends unknown[], Ele> = [...Arr, Ele]
type testPush = Push<tuple, [4]>
type UnShift<Arr extends unknown[], Ele> = [Ele, ...Arr]
type testUnShift = UnShift<tuple, [0]>
type tuple1 = [1, 2]
type tuple2 = ['guang', 'dong']
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = One extends [
  infer OneFirst,
  infer OneSecond
]
  ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
    : []
  : []
type testZip = Zip<tuple1, tuple2>

type ZipLoop<One extends unknown[], Other extends unknown[]> = One extends [infer OneFirst, ...infer OneRest]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...ZipLoop<OneRest, OtherRest>]
    : []
  : []
type testZipLoop = ZipLoop<[1, 2, 3], [4, 5, 6]>
