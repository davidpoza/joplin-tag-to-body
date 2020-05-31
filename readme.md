![image](https://user-images.githubusercontent.com/5300774/83358530-786a7d00-a374-11ea-8172-ef8447362a07.png)

This script works with Joplin App (https://joplinapp.org/) an opensource note taking utility.

This script assigns every note a tag with the same title (slugified version).
That allows us create bidirectional links between different notes, as n:n relations, **in order to achieve similar relations as Roam Research**, which implements Zettelkasten knowledge management method (Niklas Luhmann).

Optionally you can ser NOTEBOOK env var to limit the tag creation to one joplin notebook.

First of all, create a .env file with following content:

```
API_KEY=xxxxxxxxxxxx
NOTEBOOK=folder (optional)
```

# Get Authorization token
Go Joplin > Tools > Options
![image](https://user-images.githubusercontent.com/5300774/83358479-245f9880-a374-11ea-8951-a9e837cc2012.png)

# Changes on userchrome.css
Just for allowing many more tags and longer, I recommend to add this css line applied to tag list:
```
.tag-list {
  overflow-x: auto;
}
```

That's the result:
![Peek 2020-05-31 19-47](https://user-images.githubusercontent.com/5300774/83359006-a4d3c880-a377-11ea-8833-4f04a9667456.gif)

# How to use
If you want to relate two notes, only need to add add the tag of one to the other.

Given the example of "atom" note and "git" note:
- we add atom tag in git note
- and add git tag in atom note
![image](https://user-images.githubusercontent.com/5300774/83359307-c0d86980-a379-11ea-969b-b4bfaf6701c9.png)
![image](https://user-images.githubusercontent.com/5300774/83359369-10b73080-a37a-11ea-9a68-6c54def29094.png)

This way you can search by tag using **CTRL+G and typing: #tag** and see all related notes, which are pointing to current note.
![image](https://user-images.githubusercontent.com/5300774/83359404-4cea9100-a37a-11ea-93eb-30777521ef66.png)