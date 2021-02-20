export const instructions = `
Enter names of players. Players 1 and 2 are on a team against players 3 and 4. 

Submit bids for each player before the round by selecting the 0 under their name. Submit the number of tricks taken by each player the same way after the round.

For blind nil, enter 100 instead of 0 as the bid, but then submit results with the number of tricks taken as normal.
`;

export const scoring = `
Scores are computed at the end of each hand and points are awarded to each team as follows:

If a team makes or exceeds their combined bid, they are awarded 10 points per bid. For example, if one member of the team bid 3 tricks and other bid 4 tricks and, combined, they took 8 tricks, they are awarded 70 points for 7 tricks bid.

If the team exceeds their combined bid, 1 point is added for each trick over their bid. In the example above, the team is award 1 additional point for taking 8 tricks when they bid only 7. These single points are referred to as “bags.”

If a team collects 10 bags across hands, a penalty of 100 points is subtracted from their score.

If a team fails to achieve their bid, they are penalized 10 points per bid in the same way that they are awarded points.

If a player who bid Nil achieves their bid, 100 points is added to the team score (double for Blind Nil).

If a player who bid Nil takes one or more tricks, they fail their Nil bid and 100 points are subtracted from the team score (double for Blind Nil).

If one player of a partnership bids Nil, the other player’s score is computed based on their own bid and tricks taken without including any tricks taken by the Nil bidder.

The first team to achieve 500 points wins the game.
`;
