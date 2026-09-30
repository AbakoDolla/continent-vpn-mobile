/// <reference types="expo/types" />

declare module 'react-native-svg' {
  import * as React from 'react';
  export const Svg: React.ComponentType<any>;
  export const Path: React.ComponentType<any>;
  export const Defs: React.ComponentType<any>;
  export const LinearGradient: React.ComponentType<any>;
  export const Stop: React.ComponentType<any>;
  export const Circle: React.ComponentType<any>;
  export const Line: React.ComponentType<any>;
  export const Rect: React.ComponentType<any>;
  export const G: React.ComponentType<any>;
  export default Svg;
}

declare module '*.png' {
  const value: any;
  export default value;
}
