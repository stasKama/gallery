using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary1
{
    [TestFixture]
    public class TestGallery
    {
        [Test]
        public void Test()
        {
            var temp = "bla";
            Assert.AreEqual(temp, "bla");
        }

        [Test]
        public void Test2()
        {
            var temp = "bla";
            Assert.AreNotEqual(temp, "bla2");
        }
    }
}
