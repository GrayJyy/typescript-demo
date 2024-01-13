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

// 索引类型
type obj = {
  name: string
  age: number
  gender: boolean
}

type Mapping<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key]]
}

type testMapping = Mapping<{ a: 1; b: 2 }>

type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
type testUppercaseKey = UppercaseKey<{ a: 1; '3b2': 2 }>

type ToReadonly<T extends Record<string, any>> = {
  readonly [Key in keyof T]: T[Key]
}

type ToPartial<T extends Record<string, any>> = {
  [Key in keyof T]?: T[Key]
}
type ToMutable<T extends Record<string, any>> = {
  -readonly [Key in keyof T]: T[Key]
}

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key]
}

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key]
}

type testToReadonly = ToReadonly<{ a: 1; B: 2 }>
type testToPartial = ToPartial<{ a: 1 }>
type testToMutable = ToMutable<{ readonly a: 1 }>
type testFilterByValueType = FilterByValueType<{ name: string; age: number }, string>
