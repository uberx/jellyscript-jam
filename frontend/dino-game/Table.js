export default class Table {
    constructor(ctx, scaleRatio) {
        this.ctx = ctx;
        this.scaleRatio = scaleRatio;
        this.leaders = [];
    }

draw() {
        const fontSize = 15 * this.scaleRatio;
        const offset = 50 * this.scaleRatio;
        const x1 = 10 * this.scaleRatio;
        const x2 = 200 * this.scaleRatio;
        const yStart = 100 * this.scaleRatio;


        let html = `<style>
table {
width: 100%;
border-collapse: collapse;
};

th, td {
border : 1px solid #ddd;
padding 8px;
}

th {
padding-top: 12px;
padding-bottom: 12px;
text-align: left;
background-color: #4CAF50;
color: white;
}
</style>`;
        this.ctx.font = `${fontSize}px Verdana`;
        this.ctx.fillStyle = "grey";

        html += '<table><thead><tr><th>Username</th><th>Score</th></tr></thead><tbody>';

        this.leaders.forEach((leader, index) => {
            html += `<tr><td>${leader.username}</td><td>${leader.score}</td></tr>`;
        });

        html += '</tbody></table>';
        return html;

        //
        // // Draw column headers
        // this.ctx.fillText("Username", x1, yStart - offset);
        // this.ctx.fillText("Score", x1 + offset, yStart - offset);
        // this.ctx.fillText("Username", x2, yStart - offset);
        // this.ctx.fillText("Score", x2 + offset, yStart - offset);
        //
        // // Draw leaders
        // this.leaders.forEach((leader, index) => {
        //     console.log("Leader: + " + leader.username);
        //     console.log("Score: + " + leader.score);
        //     const y = yStart + index * offset;
        //     if (index < 5) {
        //         this.ctx.fillText(leader.username, x1, y);
        //         this.ctx.fillText(leader.score, x1 + offset, y);
        //     } else {
        //         const y = yStart + (index - 5) * offset;
        //         this.ctx.fillText(leader.username, x2, y);
        //         this.ctx.fillText(leader.score, x2 + offset, y);
        //     }
        // });
    }

    updateLeaders(leaders) {
        this.leaders = leaders;
    }
}
