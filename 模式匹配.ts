// 数组类型
type arr = [1, 2, 3]
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never
type PopArr<Arr extends unknown[]> = Arr extends [...infer Rest, unknown] ? Rest : never
type ShiftArr<Arr extends unknown[]> = Arr extends [unknown, ...infer Rest] ? Rest : never
type TestGetFirst = GetFirst<arr>
type TestGetLast = GetLast<arr>
type TestPopArr = PopArr<arr>
type TestShiftArr = ShiftArr<arr>

// 字符串类型
type str = 'gray and mike'
type str2 = '       gray      '
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
type TestStartWith = StartWith<str, 'g'>
type TestStartWith2 = StartWith<str, 'a'>
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str
type TestReplaceStr = ReplaceStr<str, 'and', 'or'>
type TestReplaceStr2 = ReplaceStr<str, 'zzz', 'or'>
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : Str
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str
type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>
type TestTrimStr = TrimStr<str2>

// 函数类型
type func = (name: string, age: number) => void
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never
type TestGetParameters = GetParameters<func>
type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer Returns ? Returns : never
type TestGetReturnType = GetReturnType<func>

// 构造器
interface Person {
  name: string
}

interface PersonConstructor {
  new (name: string): Person
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (
  ...args: any
) => infer InstanceType
  ? InstanceType
  : any
type TestGetInstanceType = GetInstanceType<PersonConstructor>

type GetConstructorParameters<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (
  ...args: infer ParametersType
) => any
  ? ParametersType
  : never
type TestGetConstructorParameters = GetConstructorParameters<PersonConstructor>

// 索引类型
type GetRefProps<Props> = 'ref' extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never
type TestGetRefProps = GetRefProps<{ ref?: 'gray'; name: 'x' }>
type TestGetRefProps2 = GetRefProps<{ ref?: undefined; name: 'x' }>
type TestGetRefProps3 = GetRefProps<{ name: 'x' }>
