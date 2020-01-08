function h(
  component: (props: object) => any,
  props: object,
  ...children: object[]
): any {
  return component({ children, ...props })
}

export default h
