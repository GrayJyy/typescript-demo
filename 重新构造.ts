// 数组类型
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

// 字符串类型
type strs = 'gray'
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str
type testCapitalizeStr = CapitalizeStr<strs>
type strs2 = 'gray_gray_gray'
type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}`
  ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
  : Str
type testCamelCase = CamelCase<strs2>
type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str
type testDropSubStr = DropSubStr<strs2, '_'>

// 函数类型
type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never
type testAppendArgument = AppendArgument<(name: string) => void, number>
