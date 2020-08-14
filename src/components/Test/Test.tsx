import React, {Component} from 'react';
import './style.less'
export interface PropsType {
    test: string,
    content: string
}
enum Color {
    Red,
    Green,
    Blue
}
interface SearchFunc {
    (source: string, subString: string): boolean;
}
interface NumberDictionary {
    [index: string]: number | string;
    length: number;
    name: string;
}
let mySearch: SearchFunc
mySearch = function (src, sub) {
    return true
}
class Test extends Component<PropsType, {}> {
    list: Array<number>
    render() {
        this.list = [1, 2]
        console.log(this.list)
        console.log(Color[2])
        return (
            <div className='test'>
                {this.props.test}
            </div>
        );
    }
}

export default Test;