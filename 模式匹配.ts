type arr = [1, 2, 3]
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never
type PopArr<Arr extends unknown[]> = Arr extends [...infer Rest, unknown] ? Rest : never
type TestGetFirst = GetFirst<arr>
type TestGetLast = GetLast<arr>
type TestPopArr = PopArr<arr>
