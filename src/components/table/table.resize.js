import {$} from '@core/dom';

export function resizeHandler(event, $root) {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const cords = $parent.getCoords();
        const type = $resizer.data.resize;
        const sideProp = type === 'col' ? 'bottom' : 'right';
        let valueCol;
        let valueRow;
        
        // $parent.data.col --> 1, 2, 3 
        // const cell = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

        $resizer.css({
            opacity: 1,
            [sideProp]: '-2000px',
        });

        document.onmousemove = e => {
            if (type === 'col') {
                const deltaCol = e.pageX - cords.right;
                valueCol = cords.width + deltaCol;
                $resizer.css({
                    right: -deltaCol + 'px',
                });
            } else {
                const deltaRow = e.pageY - cords.bottom;
                valueRow = Math.floor(cords.height + deltaRow);
                $resizer.css({
                    bottom: -deltaRow + 'px',
                });
            }                
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            if (type === 'col') {
                // this.$root --> Dom {$el:div.excel__table};
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach( el => el.style.width = valueCol + 'px');
            } else {
                $parent.css({
                    height: valueRow + 'px',
                });
            }
            $resizer.css({
                opacity: 0,
                bottom: -1 + 'px',
                right: -1 + 'px',
            });
        };
}
