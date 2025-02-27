import React, {Dispatch, SetStateAction} from 'react';

export interface OverlayBaseProps<R = unknown> {
  resolve: (value: R) => void;
  reject: (reason: any) => void;
}

interface OverlayInfo {
  key: string;
  Component: React.FC<any>;
  props: any;
  resolve: OverlayBaseProps<any>['resolve'];
  reject: OverlayBaseProps<any>['reject'];
}
type FlagState = [number, Dispatch<SetStateAction<number>>]

export default class OverlayController {
  private flagState: FlagState;
  private overlayInfos: OverlayInfo[] = [];

  constructor(flagState: FlagState) {
    this.flagState = flagState;
  }

  private flush() {
    const [, setFlag] = this.flagState;
    setFlag((prev) => prev + 1);
  }
  get top() {
    return this.overlayInfos[this.overlayInfos.length - 1];
  }
  private handlePromise<R>(key: string, resolver: (value: R) => void, value: R): void {
    resolver(value);
    this.overlayInfos = this.overlayInfos.filter(({ key: _key }) => key !== _key);
    this.flush();
  }
  clear() {
    while (this.overlayInfos.length) this.pop();
    this.flush();
  }
  pop() {
    this.top.reject(`Close modal: ${this.top.key}`);
    this.overlayInfos.pop();
    this.flush();
  }
  async push<P = object, R = unknown>(key: string, Component: React.FC<P & OverlayBaseProps<R>>, props: P): Promise<R> {
    return await new Promise((resolve, reject) => {
      this.overlayInfos.push({
        key: key,
        Component: Component,
        props: props,
        resolve: (value) => this.handlePromise<R>(key, resolve, value),
        reject: (reason) => this.handlePromise(key, reject, reason),
      });
      this.flush();
    });
  }
}
