import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { filterTypes } from "modules/filter";
import { DEFAULT_TABLE_RECORDS_PER_PAGE } from "config/consts";
import Filter from "components/filter";
import Pagination from "components/pagination";

class PaginatedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    onPageChange = (page) => {
        this.setState({ page });
    };

    renderEmptyList = () => {
        const { emptyPlaceholder } = this.props;
        return (
            <div className="placeholder_text">
                {emptyPlaceholder || "No records found"}
            </div>
        );
    };

    renderData = () => {
        const { recordsPerPage, data } = this.props;
        const { page } = this.state;
        const pageRecords = recordsPerPage || DEFAULT_TABLE_RECORDS_PER_PAGE;
        const pages = Math.floor((data.length + (pageRecords - 1)) / pageRecords);
        return (
            <div className="paginated-list__content">
                {data.filter((item, index) => Math.floor(index / pageRecords) === page)}
                <Pagination
                    canNext={page < pages - 1}
                    canPrevious={page > 0}
                    customPagination={this.onPageChange}
                    page={page}
                    pages={pages}
                />
            </div>
        );
    };

    render() {
        const { title, source, filters } = this.props;
        return (
            <div className="paginated-list">
                {title &&
                    <div className="paginated-list__title" key={0}>
                        {title}
                    </div>
                }
                {filters &&
                    <Filter
                        source={source}
                        filterKinds={filters}
                    />
                }
                {!this.props.data.length ?
                    this.renderEmptyList() :
                    this.renderData()
                }
            </div>
        );
    }
}

PaginatedList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
    emptyPlaceholder: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.oneOf(filterTypes.FILTER_KIND_LIST)),
    recordsPerPage: PropTypes.number,
    source: PropTypes.oneOf(filterTypes.FILTER_SOURCES),
    title: PropTypes.string,
};

export default PaginatedList;
