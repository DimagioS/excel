import {ExelComponent} from '../../core/ExcelComponent';
import {templateTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown'],
        });
    }

    toHTML() {
        return templateTable(26);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event, this.$root);
        }
    }
}
// 119 msScripting
// 2278 msRendering
