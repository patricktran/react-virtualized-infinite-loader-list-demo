import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { totalItems } from './index';

class ItemDisplay extends PureComponent {
    render() {
        const { title, style, index } = this.props;
        const imagesrc = `//via.placeholder.com/90x90.png?text=${title}`;
        return <div className="item" style={style}>{title}::{index}
            <img alt={title} src={imagesrc} />
        </div>
    }
}

class App extends Component {

    itemCount = totalItems;

    itemsPerRow = 0;

    componentDidMount() {

        //load first 60
        this.props.loadMore(0, 59);
    }

    loadMoreItems = ({ startIndex, stopIndex }) => {
        let startItemIndex = 0;

        if (startIndex > 0) {
            startItemIndex = (startIndex * this.itemsPerRow);
        }

        const endItemIndex = (stopIndex * this.itemsPerRow + this.itemsPerRow);
        console.log("load", startIndex, stopIndex, startItemIndex, endItemIndex)
        this.props.loadMore(startItemIndex, endItemIndex);
        return Promise.resolve();
    }

    render() {
        const { items } = this.props;
        console.log("items length", items)

        const isRowLoaded = ({ index }) => {
            //console.log("IsRowLoaded", index)
            const fromIndex = index * this.itemsPerRow;
            const toIndex = Math.min(fromIndex + this.itemsPerRow, this.itemCount);

            for (let i = fromIndex; i < toIndex; i++) {
                if (!items[i]) {
                    return false;
                }
            }

            return true;
        }

        const ITEM_SIZE = 275;
        const ITEM_HEIGHT = 200;

        return (
            <div className="App">
                <AutoSizer>
                    {({ height, width }) => {

                        this.itemsPerRow = Math.floor(width / ITEM_SIZE);      
                        const rowCount = Math.ceil(this.itemCount / this.itemsPerRow);

                        return <InfiniteLoader
                            isRowLoaded={isRowLoaded}
                            loadMoreRows={this.loadMoreItems}
                            rowCount={rowCount}
                            minimumBatchSize={Math.floor(30 / this.itemsPerRow)}
                            
                        >
                            {({ onRowsRendered, registerChild }) => (
                                <List
                                    ref={registerChild}
                                    onRowsRendered={onRowsRendered}
                                    height={height}
                                    width={width}
                                    rowHeight={ITEM_HEIGHT}
                                    rowCount={rowCount}
                                    rowRenderer={
                                        ({ index, key, style }) => {

                                            const renderItems = [];
                                            const fromIndex = index * this.itemsPerRow;
                                            const toIndex = Math.min(fromIndex + this.itemsPerRow, this.itemCount);

                                            for (let i = fromIndex; i < toIndex; i++) {
                                                const item = items[i];
                                                const title = item ? item.title : "Loading";

                                                renderItems.push(<ItemDisplay className="Item" key={i} index={i} title={title} />)
                                            }

                                            return (
                                                <div
                                                    className='Row'
                                                    key={key}
                                                    style={style}
                                                >
                                                    {renderItems}
                                                </div>
                                            )
                                        }}
                                />
                            )}
                        </InfiniteLoader>
                    }}
                </AutoSizer>
            </div>
        );
    }
}
const mapStateToProps = state => {
    //console.log("state", state)
    return {
        items: state.items
    }
}

const mapDispatchToProps = dispatch => ({
    loadMore: (startIndex, endIndex) => dispatch({
        type: 'LOAD_MORE',
        payload: {
            startIndex,
            endIndex
        }
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


