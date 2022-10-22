import './rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div className="ranker">
            <div className="rankername">
                {`${name}, your current entry count is...`}
            </div>
            <div className="rankerstat">
                {entries}
            </div>
        </div>
    );
}

export default Rank;